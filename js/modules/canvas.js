/**
 * RUH PROJECT - Bio-Energy Canvas Module
 * Interactive particle visualizer simulating frequency scanning.
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

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            alpha: Math.random() * 0.7 + 0.3,
            hue: Math.random() > 0.5 ? 185 : 275
        });
    }

    let pulseRadius = 0;

    function animateCanvas() {
        ctx.fillStyle = 'rgba(4, 5, 9, 0.25)';
        ctx.fillRect(0, 0, width, height);

        pulseRadius = (pulseRadius + 1.2) % (Math.max(width, height) / 2);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${1 - pulseRadius / (Math.max(width, height) / 2)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
            ctx.fill();
            ctx.shadowBlur = 0;

            for (let j = idx + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 75) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 - dist / 500})`;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
}
