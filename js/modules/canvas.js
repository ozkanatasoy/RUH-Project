/**
 * RUH PROJECT - Photorealistic Milky Way Galaxy & Bio-Energy Canvas Module
 * Renders a distinct Logarithmic Spiral Milky Way Galaxy with 3D tilted galactic core, star dust lanes, and quantum bio-energy frequency scanner HUD.
 */

export function initEnergyCanvas() {
    const canvas = document.getElementById('energyCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
        if (canvas.parentElement) {
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        }
    });

    // --- 1. Background Starfield ---
    const starfieldCount = 80;
    const starfield = [];
    for (let i = 0; i < starfieldCount; i++) {
        starfield.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.3 + 0.3,
            alpha: Math.random() * 0.85 + 0.15,
            twinkleSpeed: (Math.random() * 0.025 + 0.008) * (Math.random() > 0.5 ? 1 : -1)
        });
    }

    // --- 2. High-Density Logarithmic Spiral Milky Way Galaxy ---
    const galaxyParticleCount = 580;
    const galaxyParticles = [];
    const numArms = 2; // 2 Primary Majestic Spiral Arms + spur dust
    const armTightness = 0.18;

    for (let i = 0; i < galaxyParticleCount; i++) {
        // Distribute 70% of particles directly inside logarithmic spiral arms, 30% in cosmic halo/bulge
        const isArmParticle = Math.random() < 0.75;
        let distFromCenter, armAngle;

        if (isArmParticle) {
            const armIndex = i % numArms;
            // Radius scaling out from center
            const t = Math.random();
            distFromCenter = 15 + Math.pow(t, 1.4) * (Math.max(width, height) * 0.44);
            // Logarithmic spiral angle equation: theta = (1/b) * ln(r/a)
            const theta = (1 / armTightness) * Math.log(distFromCenter / 15);
            armAngle = theta + (armIndex * Math.PI);
            // Add gaussian-like dispersion along the arm
            const spread = (Math.random() - 0.5) * (0.35 + distFromCenter * 0.001);
            armAngle += spread;
        } else {
            // Central galactic bulge / halo dust
            distFromCenter = Math.pow(Math.random(), 2) * (Math.max(width, height) * 0.38);
            armAngle = Math.random() * Math.PI * 2;
        }

        // Color Spectrum: Center = Radiant Golden-White Nucleus -> Inner Arms = Bright Cyan & Azure -> Outer Rim = Deep Violet/Magenta
        let color, size;
        const normDist = distFromCenter / (Math.max(width, height) * 0.44);

        if (normDist < 0.15) {
            // Bright Core Nucleus
            color = `rgba(255, 245, 210, ${0.9 - normDist * 2.5})`;
            size = Math.random() * 2.5 + 1.2;
        } else if (normDist < 0.45) {
            // Inner Cyan/Neon Arm Stellar Dust
            color = `rgba(0, 242, 254, ${0.85 - normDist * 0.9})`;
            size = Math.random() * 2.0 + 0.8;
        } else if (normDist < 0.75) {
            // Middle Violet / Electric Magenta
            color = `rgba(157, 78, 221, ${0.75 - normDist * 0.6})`;
            size = Math.random() * 1.6 + 0.6;
        } else {
            // Outer Cosmic Deep Space Dust
            color = `rgba(99, 102, 241, ${0.6 - normDist * 0.4})`;
            size = Math.random() * 1.2 + 0.4;
        }

        galaxyParticles.push({
            dist: distFromCenter,
            angle: armAngle,
            radius: size,
            color: color
        });
    }

    // --- 3. Quantum Bio-Energy Nodes (Overlay Scanner Layer) ---
    const nodeCount = 30;
    const bioNodes = [];
    for (let i = 0; i < nodeCount; i++) {
        bioNodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1.2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.6 + 0.4,
            hue: Math.random() > 0.5 ? 185 : 280
        });
    }

    let pulseRadius = 0;
    let rotationAngle = 0;

    function renderFrame() {
        const centerX = width / 2;
        const centerY = height / 2;

        // Space Background Clear
        ctx.fillStyle = 'rgba(6, 7, 14, 0.32)';
        ctx.fillRect(0, 0, width, height);

        // --- Render Milky Way Glowing Core & Nebula Cloud ---
        const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.45);
        coreGlow.addColorStop(0, 'rgba(255, 235, 175, 0.45)');   // Golden Center Nucleus
        coreGlow.addColorStop(0.18, 'rgba(0, 242, 254, 0.32)');  // Bright Cyan Inner Nebula
        coreGlow.addColorStop(0.45, 'rgba(121, 40, 202, 0.20)'); // Violet Galactic Disc
        coreGlow.addColorStop(0.8, 'rgba(15, 23, 42, 0.08)');   // Outer Dark Space
        coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGlow;
        ctx.fillRect(0, 0, width, height);

        // --- Render Background Starfield ---
        starfield.forEach(star => {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 0.92 || star.alpha < 0.12) star.twinkleSpeed *= -1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });

        // --- Render Rotating Photorealistic Spiral Milky Way Galaxy ---
        rotationAngle += 0.0016; // Smooth, majestic rotation

        // Tilt angle ratio (0.46) gives a realistic 3D perspective of the galactic plane
        const tiltFactor = 0.46;

        // Draw Spiral Arm Particles
        galaxyParticles.forEach(p => {
            const currentAngle = p.angle + rotationAngle;
            const x = centerX + Math.cos(currentAngle) * p.dist;
            const y = centerY + Math.sin(currentAngle) * (p.dist * tiltFactor);

            ctx.beginPath();
            ctx.arc(x, y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.dist < 60 ? 8 : 0;
            ctx.shadowColor = '#fff5d7';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // --- Render Core Bright Galactic Center Ellipse ---
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 28, 28 * tiltFactor, rotationAngle * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 250, 220, 0.7)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
        ctx.fill();
        ctx.restore();

        // --- Render Bio-Energy Scanning Radar Pulse ---
        pulseRadius = (pulseRadius + 1.4) % (Math.max(width, height) * 0.52);
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.9 - pulseRadius / (Math.max(width, height) * 0.52)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // --- Render Floating Quantum Energy Nodes & Laser Links (Scanner Overlay) ---
        bioNodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${node.hue}, 100%, 65%, ${node.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsl(${node.hue}, 100%, 50%)`;
            ctx.fill();
            ctx.shadowBlur = 0;

            for (let j = i + 1; j < bioNodes.length; j++) {
                const node2 = bioNodes[j];
                const dist = Math.hypot(node.x - node2.x, node.y - node2.y);
                if (dist < 75) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.20 - dist / 400})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(renderFrame);
    }

    renderFrame();
}
