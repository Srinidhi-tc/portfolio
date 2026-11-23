// LabStacks: the Gallery view. Three poster cards, one per row, right aligned
// like Work, then three photos. Each poster is an image or a looping video with
// its quote below as live text.
// Hover / focus: title and quote turn --link-blue, nothing else.
// Click / Enter / Space: aria-pressed, the quote goes bold + underline and the
// video plays if it was paused. Reduced motion: poster image only.
// A missing file falls back to a neutral 3:4 block (no broken-image icon).
import { useRef, useState } from "react";
import { labCards } from "../../data/labCards";
import { labPhotos } from "../../data/labPhotos";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A 3:4 frame: the frame itself is the placeholder; media sits on top and is
// removed if it fails to load.
function Poster({ image, video, alt, videoRef }) {
  const [imgOk, setImgOk] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [vidOk, setVidOk] = useState(true);
  const useVideo = video && vidOk && !reduced();
  return (
    <span className="lab-frame">
      {useVideo ? (
        <video
          ref={videoRef}
          className="lab-media"
          src={video}
          poster={imgOk ? image : undefined}
          muted loop playsInline autoPlay
          aria-label={alt}
          onError={() => setVidOk(false)}
        />
      ) : imgOk && (
        <img
          className="lab-media"
          src={image}
          alt={alt}
          decoding="async"
          style={{ visibility: loaded ? "visible" : "hidden" }}
          onLoad={() => setLoaded(true)}
          onError={() => setImgOk(false)}
        />
      )}
    </span>
  );
}

function LabCard({ card }) {
  const [on, setOn] = useState(false);
  const videoRef = useRef(null);
  const toggle = () => {
    const v = videoRef.current;
    if (!on && v && v.paused) v.play().catch(() => {});
    setOn((x) => !x);
  };
  return (
    <div className="stack stack--small stack--right home-v2__right lab-row">
      <button type="button" className="lab-card" aria-pressed={on} onClick={toggle}>
        <Poster image={card.image} video={card.video} alt={card.alt} videoRef={videoRef} />
        <span className="lab-card__title">{card.title}</span>
        <span className={"lab-card__quote" + (on ? " lab-card__quote--on" : "")}>{card.quote}</span>
      </button>
    </div>
  );
}

export default function LabStacks() {
  return (
    <>
      {labCards.map((c) => <LabCard key={c.id} card={c} />)}
      <div className="home-v2__right lab-photos">
        {labPhotos.map((p) => <Poster key={p.id} image={p.src} alt={p.alt} />)}
      </div>
    </>
  );
}
