(() => {
    const page = document.querySelector(".page");
    const heroSvg = document.querySelector(".hero-title");
    if (!page || !heroSvg) return;

    const nodeCircles = heroSvg.querySelectorAll("circle.circuit-node");
    if (!nodeCircles.length) return;

    const NS = "http://www.w3.org/2000/svg";
    const LINE_COLOR = "#e88aab";
    const LINE_WIDTH = 1;
    const LINE_OPACITY = 0.5;
    const NODE_R = 3;
    const NODE_FILL = "#1e1e1e";
    const NODE_STROKE = "#e88aab";
    const NODE_STROKE_W = 0.7;
    const FADE_MS = 200;
    const MIN_NODE_DIST = 25;

    const overlay = document.createElementNS(NS, "svg");
    overlay.setAttribute("id", "circuit-overlay");
    Object.assign(overlay.style, {
        position: "absolute", top: "0", left: "0",
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: "10", overflow: "visible"
    });
    page.appendChild(overlay);

    let activeGroup = null;

    function gutterX() {
        const padding = parseFloat(getComputedStyle(page).paddingLeft);
        return Math.max(8, padding * 0.5);
    }

    function startY() {
        const pageRect = page.getBoundingClientRect();
        const contact = page.querySelector(".contact-info");
        if (contact) return contact.getBoundingClientRect().top - pageRect.top + NODE_R;
        const svgRect = heroSvg.getBoundingClientRect();
        const cy = parseFloat(nodeCircles[0].getAttribute("cy"));
        const vb = heroSvg.viewBox.baseVal;
        return svgRect.top - pageRect.top + cy * (svgRect.height / vb.height);
    }

    function targetPos(el) {
        const pageRect = page.getBoundingClientRect();
        const title = el.querySelector(".entry-name, .label");
        if (!title) return null;
        const r = title.getBoundingClientRect();
        return { x: r.left - pageRect.left, y: r.top - pageRect.top + r.height / 2 };
    }

    function makeLine(x1, y1, x2, y2) {
        const l = document.createElementNS(NS, "line");
        l.setAttribute("x1", x1); l.setAttribute("y1", y1);
        l.setAttribute("x2", x2); l.setAttribute("y2", y2);
        l.setAttribute("stroke", LINE_COLOR);
        l.setAttribute("stroke-width", LINE_WIDTH);
        l.setAttribute("stroke-opacity", LINE_OPACITY);
        return l;
    }

    function makeNode(cx, cy) {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", cx); c.setAttribute("cy", cy);
        c.setAttribute("r", NODE_R);
        c.setAttribute("fill", NODE_FILL);
        c.setAttribute("stroke", NODE_STROKE);
        c.setAttribute("stroke-width", NODE_STROKE_W);
        c.setAttribute("stroke-opacity", "0.7");
        return c;
    }

    function isRightCol(el) {
        const grid = el.closest(".grid");
        if (!grid) return false;
        const gr = grid.getBoundingClientRect();
        return el.getBoundingClientRect().left > gr.left + gr.width / 3;
    }

    function contentBottom(el) {
        const pageTop = page.getBoundingClientRect().top;
        const last = el.querySelector("ul:last-child, p:last-child, li:last-child");
        return (last || el).getBoundingClientRect().bottom - pageTop;
    }

    function rightColRouting(el) {
        const pageRect = page.getBoundingClientRect();
        const prev = el.previousElementSibling;
        const bottom = prev ? contentBottom(prev) : contentBottom(el);

        let gapY;
        const next = el.nextElementSibling;
        if (next && (next.classList.contains("entry") || next.classList.contains("skills-group"))) {
            gapY = (bottom + next.getBoundingClientRect().top - pageRect.top) / 2;
        } else {
            const section = el.closest("section");
            gapY = section
                ? (bottom + section.getBoundingClientRect().bottom - pageRect.top) / 2
                : bottom + 12;
        }

        const elLeft = el.getBoundingClientRect().left - pageRect.left;
        const prevRight = prev ? prev.getBoundingClientRect().right - pageRect.left : elLeft;
        return { gapY, colGapX: (prevRight + elLeft) / 2 };
    }

    function buildWaypoints(el) {
        const target = targetPos(el);
        if (!target) return null;

        const gx = gutterX();
        const sy = startY();
        const pts = [{ x: gx, y: sy }];

        if (isRightCol(el)) {
            const { gapY, colGapX } = rightColRouting(el);
            pts.push({ x: gx, y: gapY });
            pts.push({ x: colGapX, y: gapY });
            pts.push({ x: colGapX, y: target.y });
            pts.push({ x: target.x, y: target.y });
        } else {
            pts.push({ x: gx, y: target.y });
            pts.push({ x: target.x, y: target.y });
        }

        const last = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        const dx = last.x - prev.x;
        const dy = last.y - prev.y;
        const len = Math.hypot(dx, dy) || 1;
        last.x += (dx / len) * 2;
        last.y += (dy / len) * 2;

        return pts;
    }

    function show(el) {
        hide();
        const pts = buildWaypoints(el);
        if (!pts) return;

        const g = document.createElementNS(NS, "g");
        g.classList.add("circuit-connector");
        g.style.opacity = "0";
        g.style.transition = `opacity ${FADE_MS}ms ease`;

        for (let i = 0; i < pts.length - 1; i++) {
            g.appendChild(makeLine(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y));
        }

        const terminal = pts[pts.length - 1];
        for (let i = 0; i < pts.length - 1; i++) {
            const prev = i > 0 ? Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y) : Infinity;
            const next = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
            const term = Math.hypot(terminal.x - pts[i].x, terminal.y - pts[i].y);
            if (prev >= MIN_NODE_DIST && next >= MIN_NODE_DIST && term >= MIN_NODE_DIST) {
                g.appendChild(makeNode(pts[i].x, pts[i].y));
            }
        }

        overlay.appendChild(g);
        activeGroup = g;
        requestAnimationFrame(() => { g.style.opacity = "1"; });
    }

    function hide() {
        if (!activeGroup) return;
        const g = activeGroup;
        activeGroup = null;
        g.style.opacity = "0";
        setTimeout(() => { if (g.parentNode) g.parentNode.removeChild(g); }, FADE_MS);
    }

    page.querySelectorAll(".entry, .skills-group").forEach(el => {
        el.addEventListener("mouseenter", () => show(el));
        el.addEventListener("mouseleave", () => hide());
    });
})();
