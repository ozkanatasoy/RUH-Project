/**
 * RUH PROJECT - Bio-Energy & Milky Way Galaxy Canvas Module
 * Combines an animated 3D-feeling Milky Way Spiral Galaxy with quantum bio-energy frequency scanner overlay.
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
    const starfieldCount = 70;
    const starfield = [];
    for (let i = 0; i < starfieldCount; i++) {
        starfield.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.2 + 0.3,
            alpha: Math.random() * 0.8 + 0.2,
            twinkleSpeed: (Math.random() * 0.03 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
        });
    }

    // --- 2. Spiral Milky Way Galaxy Particles ---
    const galaxyParticleCount = 280;
    const galaxyParticles = [];
    const numArms = 4;
    const armTightness = 0.035;

    for (let i = 0; i < galaxyParticleCount; i++) {
        const armIndex = i % numArms;
        const distFromCenter = Math.pow(Math.random(), 1.6) * (Math.max(width, height) * 0.48);
        const baseAngle = (armIndex * (2 * Math.PI / numArms)) + (distFromCenter * armTightness);
        const angleSpread = (Math.random() - 0.5) * 0.4;
        const finalAngle = baseAngle + angleSpread;

        // Color gradient based on distance: Cyan/Gold near core, Violet/Deep Blue near outer rim
        let color;
        const ratio = distFromCenter / (Math.max(width, height) * 0.48);
        if (ratio < 0.25) {
            color = `rgba(255, 235, 170, ${0.8 - ratio * 2})`; // Bright Core Gold/White
        } else if (ratio < 0.6) {
            color = `rgba(0, 242, 254, ${0.7 - ratio * 0.8})`; // Cyan Inner Arm
        } else {
            color = `rgba(157, 78, 221, ${0.6 - ratio * 0.5})`; // Violet/Purple Outer Dust
        }

        galaxyParticles.push({
            dist: distFromCenter,
            angle: finalAngle,
            radius: Math.random() * 1.8 + 0.5,
            speed: (0.0015 + (1 / (distFromCenter + 30)) * 0.2), // Inner stars rotate slightly faster
            color: color
        });
    }

    // --- 3. Quantum Bio-Energy Nodes (Scanner Layer) ---
    const nodeCount = 35;
    const bioNodes = [];
    for (let i = 0; i < nodeCount; i++) {
        bioNodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1.2,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.6 + 0.4,
            hue: Math.random() > 0.5 ? 185 : 280
        });
    }

    let pulseRadius = 0;
    let rotationAngle = 0;

    function renderFrame() {
        const centerX = width / 2;
        const centerY = height / 2;

        // Space Background Fade
        ctx.fillStyle = 'rgba(5, 6, 12, 0.35)';
        ctx.fillRect(0, 0, width, height);

        // --- Render Milky Way Nebula Core Glow ---
        const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.4);
        coreGlow.addColorStop(0, 'rgba(0, 242, 254, 0.28)');
        coreGlow.addColorStop(0.3, 'rgba(121, 40, 202, 0.18)');
        coreGlow.addColorStop(0.7, 'rgba(15, 23, 42, 0.08)');
        coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGlow;
        ctx.fillRect(0, 0, width, height);

        // --- Render Background Starfield ---
        starfield.forEach(star => {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 0.95 || star.alpha < 0.15) star.twinkleSpeed *= -1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });

        // --- Render Rotating Milky Way Galaxy Arms ---
        rotationAngle += 0.0018;

        galaxyParticles.forEach(p => {
            const currentAngle = p.angle + rotationAngle;
            const x = centerX + Math.cos(currentAngle) * p.dist;
            const y = centerY + Math.sin(currentAngle) * (p.dist * 0.65); // Tilt angle for 3D perspective

            ctx.beginPath();
            ctx.arc(x, y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        // --- Render Bio-Energy Scanning Radar Pulse ---
        pulseRadius = (pulseRadius + 1.4) % (Math.max(width, height) * 0.55);
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${1 - pulseRadius / (Math.max(width, height) * 0.55)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // --- Render Floating Quantum Energy Nodes & Laser Links ---
        bioNodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${node.hue}, 100%, 65%, ${node.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsl(${node.hue}, 100%, 50%)`;
            ctx.fill();
            ctx.shadowBlur = 0;

            for (let j = i + 1; j < bioNodes.length; j++) {
                const node2 = bioNodes[j];
                const dist = Math.hypot(node.x - node2.x, node.y - node2.y);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.22 - dist / 400})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(renderFrame);
    }

    renderFrame();
}
