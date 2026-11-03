#!/usr/bin/env python3
"""
Generate 1200x630 Open Graph card images, one per route.

Run this LOCALLY (macOS) whenever route titles or source images change:

    python3 scripts/gen-og-images.py

Output lands in public/og/ and is COMMITTED to the repo. It deliberately does
not run in CI: it depends on Pillow and on macOS system fonts, neither of which
is available on the ubuntu-latest GitHub Actions runner. Keeping generation
local means the deploy build stays pure Node and cannot break on a missing font.
Decoding AVIF additionally shells out to ffmpeg (or sips on macOS).

Every card's artwork is the image that route actually renders on the page,
confirmed against the live site - not stock or generated stand-in art.
"""

import glob
import hashlib
import io
import json
import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFont

failures = []

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "og")

W, H = 1200, 630
PAD = 64
IMG_W = 470              # right-hand image panel width
TEXT_W = W - IMG_W - PAD * 2 - 32

# Neutral palette, mirrors src/styles/tokens.css
BG = (251, 251, 253)
INK = (29, 29, 31)
MUTED = (110, 110, 115)
BORDER = (210, 210, 215)
SURFACE = (241, 241, 244)

FONT_DIR = "/System/Library/Fonts/Supplemental"
F_BOLD = os.path.join(FONT_DIR, "Arial Bold.ttf")
F_REG = os.path.join(FONT_DIR, "Arial.ttf")


def load_image(path):
    """Open `path`, falling back to an external decoder for formats Pillow lacks.

    The project's hero art is AVIF, which this Pillow build cannot read. Earlier
    revisions silently fell back to a text-only card for those routes, so three
    case studies shipped with placeholder art instead of the screenshot the page
    actually shows. Decode through ffmpeg (or sips) instead of skipping.
    """
    try:
        im = Image.open(path)
        im.load()
        return im
    except Exception:
        pass

    tmp = os.path.join(tempfile.mkdtemp(), "decoded.png")
    for cmd in (
        ["ffmpeg", "-y", "-loglevel", "error", "-i", path, "-frames:v", "1", tmp],
        ["sips", "-s", "format", "png", path, "--out", tmp],
    ):
        if shutil.which(cmd[0]) is None:
            continue
        try:
            subprocess.run(cmd, check=True, capture_output=True)
            im = Image.open(tmp)
            im.load()
            return im
        except Exception:
            continue

    raise OSError(f"no decoder could read {path}")


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def wrap(draw, text, fnt, max_w):
    """Greedy word wrap to a pixel width."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def cover(im, box_w, box_h):
    """Scale-and-center-crop `im` to exactly box_w x box_h."""
    im = im.convert("RGB")
    src_r, box_r = im.width / im.height, box_w / box_h
    if src_r > box_r:
        new_h = box_h
        new_w = max(box_w, int(round(box_h * src_r)))
    else:
        new_w = box_w
        new_h = max(box_h, int(round(box_w / src_r)))
    im = im.resize((new_w, new_h), Image.LANCZOS)
    left, top = (new_w - box_w) // 2, (new_h - box_h) // 2
    return im.crop((left, top, left + box_w, top + box_h))


def contain(im, box_w, box_h):
    """Fit all of `im` inside box_w x box_h, matted on the surface tone.

    These sources are product screenshots and renders whose aspect ratios vary
    from 1200x681 landscape to 1024x1024 square. Cropping them to fill a
    portrait panel cut the sides off the Azure dashboard and the StraboSpot map,
    which is exactly the detail the card is meant to show, so letterbox instead.
    """
    # Several sources now carry an alpha channel (their white canvas was
    # knocked out for dark mode). convert("RGB") would discard that and reveal
    # the original white, so composite through the mask instead and let the
    # panel tone show where the image is transparent.
    im = im.convert("RGBA")
    scale = min(box_w / im.width, box_h / im.height)
    new_w, new_h = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((new_w, new_h), Image.LANCZOS)
    panel = Image.new("RGB", (box_w, box_h), SURFACE)
    panel.paste(im, ((box_w - new_w) // 2, (box_h - new_h) // 2), im)
    return panel


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius, fill=255)
    return mask


def build_card(route, site):
    card = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(card)

    src_rel = route.get("source")
    has_img = False
    if src_rel:
        src_abs = os.path.join(ROOT, src_rel)
        if os.path.exists(src_abs):
            try:
                panel_w, panel_h = IMG_W, H - PAD * 2
                art = contain(load_image(src_abs), panel_w, panel_h)
                card.paste(art, (W - PAD - panel_w, PAD), rounded_mask((panel_w, panel_h), 24))
                has_img = True
            except Exception as e:  # noqa: BLE001 - fall back to a text-only card
                print(f"  ! could not use {src_rel}: {type(e).__name__}: {e}")
                failures.append(f"{src_rel}: {e}")
        else:
            failures.append(f"{src_rel}: file not found")

    text_w = TEXT_W if has_img else W - PAD * 2

    f_eyebrow = font(F_BOLD, 22)
    f_title = font(F_BOLD, 60)
    f_desc = font(F_REG, 27)
    f_name = font(F_REG, 24)

    # Eyebrow
    y = PAD + 8
    d.text((PAD, y), route.get("eyebrow", ""), font=f_eyebrow, fill=MUTED)
    y += 46

    # Title — shrink until it fits in at most 3 lines
    title = route["title"].split(" — ")[0]
    size = 60
    while size > 34:
        f_title = font(F_BOLD, size)
        lines = wrap(d, title, f_title, text_w)
        if len(lines) <= 3:
            break
        size -= 4
    lines = wrap(d, title, f_title, text_w)[:3]
    for ln in lines:
        d.text((PAD, y), ln, font=f_title, fill=INK)
        y += int(size * 1.18)

    # Description — up to 4 lines, ellipsised rather than cut mid-sentence
    y += 14
    desc_lines = wrap(d, route["description"], f_desc, text_w)
    shown = desc_lines[:4]
    if len(desc_lines) > 4:
        shown[-1] = shown[-1].rstrip(" ,.;:") + "\u2026"
    for ln in shown:
        d.text((PAD, y), ln, font=f_desc, fill=MUTED)
        y += 38

    # Footer rule + byline
    fy = H - PAD - 34
    d.line([(PAD, fy - 18), (PAD + text_w, fy - 18)], fill=BORDER, width=2)
    d.text((PAD, fy), site["author"], font=f_name, fill=INK)
    label = "Product Designer"
    d.text((PAD + text_w - d.textlength(label, font=f_name), fy), label, font=f_name, fill=MUTED)

    return card


def main():
    with open(os.path.join(ROOT, "scripts", "routes.json")) as f:
        manifest = json.load(f)

    base = manifest["site"]["base"]
    os.makedirs(OUT_DIR, exist_ok=True)
    index = {}

    for route in manifest["routes"]:
        name = route["og"]
        card = build_card(route, manifest["site"])

        # Hash the encoded bytes so the filename changes if and only if the
        # picture changes. Social platforms cache an image by URL, so reusing
        # "microsoft.png" for new artwork can leave a re-scrape still serving
        # the stale card; a content-addressed name makes that impossible.
        buf = io.BytesIO()
        card.save(buf, "PNG", optimize=True)
        data = buf.getvalue()
        fname = f"{name}-{hashlib.sha256(data).hexdigest()[:8]}.png"

        # Drop older revisions of this same card, and the legacy unhashed file.
        for stale in glob.glob(os.path.join(OUT_DIR, f"{name}-*.png")):
            if os.path.basename(stale) != fname:
                os.remove(stale)
        legacy = os.path.join(OUT_DIR, f"{name}.png")
        if os.path.exists(legacy):
            os.remove(legacy)

        with open(os.path.join(OUT_DIR, fname), "wb") as fh:
            fh.write(data)
        index[name] = f"{base}/og/{fname}"
        print(f"  wrote public/og/{fname}  ({len(data) // 1024} KB)")

    # A stable, non-hashed alias of the work card. The external short-URL
    # forwarder references this: it cannot be redeployed every time a card is
    # regenerated, so it needs one filename that never changes. Everything the
    # site itself references still uses the content-hashed names above.
    work_card = index.get("work")
    if work_card:
        src = os.path.join(OUT_DIR, os.path.basename(work_card))
        shutil.copyfile(src, os.path.join(OUT_DIR, "share.png"))
        print(f"  wrote public/og/share.png  (stable alias of {os.path.basename(work_card)})")

    with open(os.path.join(ROOT, "scripts", "og-manifest.json"), "w") as fh:
        json.dump(index, fh, indent=2, sort_keys=True)
        fh.write("\n")

    print(f"\nGenerated {len(manifest['routes'])} OG cards into public/og/")
    print("Wrote scripts/og-manifest.json (read by scripts/prerender.mjs)")
    if failures:
        print("\nWARNING - these routes fell back to a text-only card:")
        for f in failures:
            print(f"  - {f}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
