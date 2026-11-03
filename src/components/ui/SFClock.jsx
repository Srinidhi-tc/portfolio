import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
});

// Current San Francisco time, shown as quiet text in the navbar's right corner.
export default function SFClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  const time = formatter.format(now);

  return (
    <p className="sf-clock" aria-label={`San Francisco time, ${time}`}>
      <span aria-hidden="true">SF, {time}</span>
    </p>
  );
}
