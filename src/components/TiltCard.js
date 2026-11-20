import { useRef } from 'react';

const MAX_TILT_X = 10;
const MAX_TILT_Y = 14;

// 3D tilt that follows the mouse. Touch devices skip the tilt (it fights scrolling)
// and get the scroll-in 3D entrance from <Reveal variant="flip"> instead.
export default function TiltCard({ className = '', children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const { style } = ref.current;
    style.setProperty('--rx', `${(0.5 - py) * MAX_TILT_X * 2}deg`);
    style.setProperty('--ry', `${(px - 0.5) * MAX_TILT_Y * 2}deg`);
    style.setProperty('--gx', `${px * 100}%`);
    style.setProperty('--gy', `${py * 100}%`);
    ref.current.classList.add('is-tilting');
  };

  const handleLeave = () => {
    if (!ref.current) return;
    const { style } = ref.current;
    style.setProperty('--rx', '0deg');
    style.setProperty('--ry', '0deg');
    ref.current.classList.remove('is-tilting');
  };

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </div>
  );
}
