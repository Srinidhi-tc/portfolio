// The small 3D renders used in the project row and as stickers on the project
// cards, keyed by project id. Imported from src/assets/ so Vite hashes and
// bundles them like every other project image.
import azureRender from "../assets/azuretop.webp";
import tutorRender from "../assets/tutortop.webp";
import pulseRender from "../assets/pulsetop.webp";
import malliRender from "../assets/mallitop.webp";
import bloomRender from "../assets/bloomtop.webp";
import mindRender from "../assets/mindtop.webp";
import defenseArkRender from "../assets/defensearktop.webp";

export const projectRenders = {
  "microsoft":          { label: "Azure",      image: azureRender },
  "ai-coding":          { label: "Tutor",      image: tutorRender },
  "hearts-of-insomnia": { label: "Pulse",      image: pulseRender },
  "malli":              { label: "Malli",      image: malliRender },
  "bee-feeder":         { label: "Bloom",      image: bloomRender },
  "psychosis-literacy": { label: "Mind",       image: mindRender },
  "defenseark":         { label: "DefenseARK", image: defenseArkRender },
};
