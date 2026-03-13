(() => {
    const svg = document.querySelector(".hero-title");
    const glowRect = document.getElementById("glow-rect");
    const pulseRect = document.getElementById("pulse-glow-rect");
    const pulseDot = document.getElementById("pulse-dot");
    if (!svg || !glowRect || !pulseRect || !pulseDot) return;

    const pt = svg.createSVGPoint();
    const mouseR = 100;
    const pulseR = 50;

    // mouse glow
    svg.addEventListener("mousemove", (e) => {
        pt.x = e.clientX;
        pt.y = e.clientY;
        const p = pt.matrixTransform(svg.getScreenCTM().inverse());
        glowRect.setAttribute("x", p.x - mouseR);
        glowRect.setAttribute("y", p.y - mouseR);
        glowRect.setAttribute("width", mouseR * 2);
        glowRect.setAttribute("height", mouseR * 2);
        glowRect.setAttribute("transform", "");
    });

    svg.addEventListener("mouseleave", () => {
        glowRect.setAttribute("transform", "translate(-9999, -9999)");
    });

    // pulse dot glow
    function tick() {
        const ctm = pulseDot.getCTM();
        if (ctm) {
            pulseRect.setAttribute("x", ctm.e - pulseR);
            pulseRect.setAttribute("y", ctm.f - pulseR);
            pulseRect.setAttribute("width", pulseR * 2);
            pulseRect.setAttribute("height", pulseR * 2);
            pulseRect.setAttribute("transform", "");
        }
        requestAnimationFrame(tick);
    }
    tick();
})();
