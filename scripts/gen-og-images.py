#!/usr/bin/env python3
"""
Generate 1200x630 Open Graph card images, one per route.

Run this LOCALLY (macOS) whenever route titles or source images change:

    python3 scripts/gen-og-images.py

Output lands in public/og/ and is COMMITTED to the repo. It deliberately does
not run in CI: it depends on Pillow and on macOS system fonts, neither of which
is available on the ubuntu-latest GitHub Actions runner. Keeping generation
local means the deploy build stays pure Node and cannot break on a missing font.
"""

import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

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

FONT_DIR = "/System/Library/Fonts/Supplemental"
F_BOLD = os.path.join(FONT_DIR, "Arial Bold.ttf")
F_REG = os.path.join(FONT_DIR, "Arial.ttf")


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
                art = cover(Image.open(src_abs), panel_w, panel_h)
                card.paste(art, (W - PAD - panel_w, PAD), rounded_mask((panel_w, panel_h), 24))
                has_img = True
            except Exception as e:  # noqa: BLE001 - fall back to a text-only card
                print(f"  ! could not use {src_rel}: {type(e).__name__}: {e}")

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

    # Description — up to 3 lines
    y += 14
    for ln in wrap(d, route["description"], f_desc, text_w)[:3]:
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

    os.makedirs(OUT_DIR, exist_ok=True)
    for route in manifest["routes"]:
        name = route["og"]
        card = build_card(route, manifest["site"])
        out = os.path.join(OUT_DIR, f"{name}.png")
        card.save(out, "PNG", optimize=True)
        print(f"  wrote public/og/{name}.png  ({os.path.getsize(out) // 1024} KB)")

    print(f"\nGenerated {len(manifest['routes'])} OG cards into public/og/")


if __name__ == "__main__":
    sys.exit(main())
