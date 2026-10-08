// Contact links shared by the footer and the About page.
// The resume is a live Google Doc shared as "Anyone with the link: Viewer".
export const RESUME_URL =
  "https://docs.google.com/document/d/1L7KrVDGs4sB1smuKFRsFkuFA7jSWT83G/edit?usp=sharing&ouid=113867948688877731321&rtpof=true&sd=true";
export const EMAIL_URL = "mailto:srinidhi.saas@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/srinidhi-chakravarthy/";

export const contactLinks = [
  { label: "Email", href: EMAIL_URL },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "Resume", href: RESUME_URL, external: true },
];
