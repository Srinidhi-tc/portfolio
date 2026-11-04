// Home-page objects, keyed by project id. Each file is trimmed to its visible
// edges and centred in a transparent square, so every object fills the same
// --object-size box. Sources: the project-row renders (*top.webp) and, for
// StraboSpot, work-strabospot.webp.
import azure from "../assets/obj-azure.webp";
import tacc from "../assets/obj-tacc.webp";
import defenseark from "../assets/obj-defenseark.webp";
import strabospot from "../assets/obj-strabospot.webp";
import psychosis from "../assets/obj-psychosis.webp";
import heart from "../assets/obj-heart.webp";
import bloom from "../assets/obj-bloom.webp";
import malli from "../assets/obj-malli.webp";

export const projectObjects = {
  "microsoft": azure,
  "ai-coding": tacc,
  "defenseark": defenseark,
  "strabospot": strabospot,
  "psychosis-literacy": psychosis,
  "hearts-of-insomnia": heart,
  "bee-feeder": bloom,
  "malli": malli,
};
