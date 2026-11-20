import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TEAL = 0x2ee6d6;
const TEAL_SOFT = 0x7ffff4;
const WARM = 0x58f9ff;

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // No WebGL (old device, disabled GPU, test env): the CSS gradient fallback stays visible.
      mount.classList.add('hero-scene--fallback');
      return undefined;
    }

    const isSmall = window.innerWidth < 768;
    const reduceMotion = prefersReducedMotion();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05080a, 8, 18);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const key = new THREE.DirectionalLight(TEAL_SOFT, 2.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(WARM, 1.1);
    rim.position.set(-5, -2, -1);
    scene.add(rim);

    const disposables = [];
    const track = (...items) => {
      disposables.push(...items);
      return items[0];
    };

    // Core object: faceted solid, wireframe shell, glowing vertices.
    const core = new THREE.Group();
    scene.add(core);

    const solid = new THREE.Mesh(
      track(new THREE.IcosahedronGeometry(1.2, 0)),
      track(new THREE.MeshStandardMaterial({
        color: 0x0b3b3a,
        emissive: 0x022a29,
        metalness: 0.65,
        roughness: 0.25,
        flatShading: true,
      })),
    );
    core.add(solid);

    const shellGeometry = track(new THREE.IcosahedronGeometry(1.65, 1));
    const shell = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(shellGeometry)),
      track(new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.5 })),
    );
    core.add(shell);

    const nodes = new THREE.Points(
      shellGeometry,
      track(new THREE.PointsMaterial({ color: TEAL_SOFT, size: 0.07, transparent: true, opacity: 0.9 })),
    );
    shell.add(nodes);

    // Orbital rings with a satellite on each.
    const rings = [];
    [
      { radius: 2.35, tilt: [1.2, 0.2, 0], speed: 0.6, color: TEAL },
      { radius: 2.75, tilt: [0.4, -0.9, 0.3], speed: -0.4, color: WARM },
    ].forEach(({ radius, tilt, speed, color }) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(...tilt);
      const ring = new THREE.Mesh(
        track(new THREE.TorusGeometry(radius, 0.008, 8, 200)),
        track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })),
      );
      const satellite = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.07, 16, 16)),
        track(new THREE.MeshBasicMaterial({ color })),
      );
      satellite.position.x = radius;
      const orbit = new THREE.Group();
      orbit.add(satellite);
      pivot.add(ring, orbit);
      core.add(pivot);
      rings.push({ orbit, speed });
    });

    // Starfield in a spherical shell around the scene.
    const particleCount = isSmall ? 450 : 1200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeometry = track(new THREE.BufferGeometry());
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeometry,
      track(new THREE.PointsMaterial({ color: 0x5fd3cb, size: 0.035, transparent: true, opacity: 0.6 })),
    );
    scene.add(stars);

    // Layout: object sits right of the copy on wide screens, above it on narrow ones.
    const layout = { x: 0, y: 0, scale: 1 };
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (camera.aspect >= 1.1) {
        layout.x = 2.1;
        layout.y = 0;
        layout.scale = 1;
      } else {
        // Portrait: shrink with the narrower horizontal field of view and lift above the copy.
        layout.x = 0;
        layout.scale = THREE.MathUtils.clamp(camera.aspect * 1.25, 0.55, 0.9);
        layout.y = 1.65;
      }
      core.scale.setScalar(layout.scale);
      if (reduceMotion) render();
    };

    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0, scroll: 0 };
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const render = () => {
      core.position.set(layout.x, layout.y + eased.scroll * 1.4, 0);
      renderer.render(scene, camera);
    };

    let frameId = null;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);

      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;
      eased.scroll += (scroll - eased.scroll) * 0.1;

      solid.rotation.y += dt * 0.35;
      solid.rotation.x += dt * 0.15;
      shell.rotation.y -= dt * 0.12;
      core.rotation.x = Math.sin(t * 0.4) * 0.15 + eased.y * 0.35 + eased.scroll * 0.8;
      core.rotation.y = eased.x * 0.5;
      rings.forEach(({ orbit, speed }) => { orbit.rotation.z += dt * speed; });
      stars.rotation.y += dt * 0.015;
      camera.position.x = eased.x * 0.4;
      camera.position.y = -eased.y * 0.3;
      camera.lookAt(0, 0, 0);

      render();
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      clock.getDelta();
      frameId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    // Only animate while the hero is on screen and the tab is visible.
    let inView = true;
    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start(); else stop();
      })
      : null;
    observer?.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(mount);
    else window.addEventListener('resize', resize);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    if (reduceMotion) render();
    else start();
    mount.classList.add('hero-scene--ready');

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}
