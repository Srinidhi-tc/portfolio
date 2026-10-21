// Projectile flight for the ball toys: a thrown ball under constant gravity.
//
// The launch velocity is solved from kinematics so the ball lands exactly on
// the target after `T` ms:
//   vx = (xTarget - xStart) / T
//   vy = (yTarget - yStart) / T - 0.5 * GRAVITY * T
// Each animation frame then advances the ball by the real elapsed time. Screen
// y grows downward, so gravity is positive. Rotation runs at an angular
// velocity proportional to launch speed, so harder throws spin faster.

// px / ms². With a ~900ms throw the ball rises a little, slows to a stop at
// the top (v = v0 − g·t on the way up) and speeds up as it falls; the kick
// back climbs against gravity and visibly slows before dropping home.
export const GRAVITY = 0.002;

// Degrees of spin per (px / ms) of launch speed, per ms of flight.
const SPIN_PER_SPEED = 0.9;

export function launchVelocity(start, end, T, g = GRAVITY) {
  return {
    vx: (end.x - start.x) / T,
    vy: (end.y - start.y) / T - 0.5 * g * T,
  };
}

/**
 * Fly from `start` to `end` in `T` ms. Calls onFrame({ x, y, rotation, speed,
 * progress }) every frame and resolves with the final rotation.
 * `spinSign` is 1 or -1; `rafRef` receives the pending frame id for cleanup.
 */
export function flyProjectile({ start, end, T, g = GRAVITY, spinSign = 1, rotation = 0, rafRef, onFrame }) {
  return new Promise((resolve) => {
    let { vx, vy } = launchVelocity(start, end, T, g);
    const omega = spinSign * SPIN_PER_SPEED * Math.hypot(vx, vy);
    let x = start.x;
    let y = start.y;
    let rot = rotation;
    let elapsed = 0;
    let last = null;

    const step = (now) => {
      if (last === null) last = now;
      // Real elapsed time; capped so a backgrounded tab can't teleport the ball.
      const dt = Math.min(now - last, 48);
      last = now;

      if (elapsed + dt >= T) {
        onFrame({ x: end.x, y: end.y, rotation: rot, speed: Math.hypot(vx, vy), progress: 1 });
        resolve(rot);
        return;
      }

      elapsed += dt;
      // Exact step for constant acceleration, so the ball lands where solved.
      x += vx * dt;
      y += vy * dt + 0.5 * g * dt * dt;
      vy += g * dt;
      rot += omega * dt;

      onFrame({ x, y, rotation: rot, speed: Math.hypot(vx, vy), progress: elapsed / T });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  });
}

/**
 * Flight time for a ball launched `rise` px upward (screen y decreasing) that
 * peaks `overshoot` px above its landing point and then falls onto it.
 * Solves 0.5·g·T² − v·T − rise = 0, where v = sqrt(2·g·overshoot) is the
 * downward speed it lands with.
 */
export function returnFlightTime(rise, overshoot, g = GRAVITY) {
  const v = Math.sqrt(2 * g * overshoot);
  return (v + Math.sqrt(v * v + 2 * g * rise)) / g;
}

// A value in [base * (1 - spread), base * (1 + spread)].
export const jitter = (base, spread) => base * (1 + (Math.random() * 2 - 1) * spread);
