import { Fragment } from "react";
import { contactLinks } from "../../data/links";

// Email · LinkedIn · Resume as plain text links.
export default function ContactLinks({ className = "" }) {
  return (
    <p className={`contact-links ${className}`.trim()}>
      {contactLinks.map(({ label, href, external }, i) => (
        <Fragment key={label}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <a
            href={href}
            className="contact-link"
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {label}
          </a>
        </Fragment>
      ))}
    </p>
  );
}
