import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="page-title">Page not found.</h1>
        <p className="page-copy">
          The page you were looking for does not exist.
        </p>
        <Link className="inline-link" to="/">
          Go back home
        </Link>
      </div>
    </section>
  );
}
