const S = (sel, ctx) => (ctx || document).querySelector(sel);
const SA = (sel, ctx) => (ctx || document).querySelectorAll(sel);

// ── Notes page — Animations ──────────────────────

function runAnimations() {
    gsap.to("[data-note='to'] .box", {
        x: 50, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut",
    });

    gsap.from("[data-note='from'] .box", {
        scale: 0, duration: 1, yoyo: true, repeat: -1, ease: "back.out(2)",
    });

    gsap.fromTo("[data-note='fromto'] .box",
        { scale: 0, rotate: 0 },
        { scale: 1, rotate: 360, duration: 1.2, yoyo: true, repeat: -1, ease: "power1.inOut" }
    );

    gsap.set("[data-note='set'] .box", { x: 25, rotation: 15 });

    gsap.to("[data-note='keyframes'] .box", {
        keyframes: [
            { x: 60, duration: 0.4 },
            { y: 40, duration: 0.4 },
            { x: 0, duration: 0.4 },
            { y: 0, duration: 0.4 },
        ],
        repeat: -1, ease: "power1.inOut",
    });

    gsap.to(".dot", {
        y: -20, duration: 0.6, stagger: 0.15, yoyo: true, repeat: -1, ease: "power1.inOut",
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to("[data-note='timeline'] .box", { x: 40, duration: 0.4 })
        .to("[data-note='timeline'] .box", { rotate: 360, duration: 0.6 })
        .to("[data-note='timeline'] .box", { scale: 1.3, duration: 0.4 });

    gsap.to(".easing-dot:nth-child(1)", { y: -30, duration: 0.8, yoyo: true, repeat: -1, ease: "bounce.out" });
    gsap.to(".easing-dot:nth-child(2)", { y: -30, duration: 0.8, yoyo: true, repeat: -1, ease: "back.out(2)" });
    gsap.to(".easing-dot:nth-child(3)", { y: -30, duration: 1.2, yoyo: true, repeat: -1, ease: "elastic.out(1, 0.3)" });
    gsap.to(".easing-dot:nth-child(4)", { y: -30, duration: 0.6, yoyo: true, repeat: -1, ease: "power4.inOut" });

    let count = 0;
    gsap.to("[data-note='callbacks'] .box", {
        x: 40, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut",
        onUpdate: () => { S("#counterBadge").textContent = ++count; },
    });

    gsap.to("[data-note='scrolltrigger'] .box", {
        x: 40, duration: 1, yoyo: true, repeat: -1, ease: "power1.inOut",
    });

    setInterval(() => {
        S("#randNum").textContent = gsap.utils.random(0, 999, 1);
    }, 300);

    if (typeof Draggable !== "undefined") {
        Draggable.create(".drag-me", {
            bounds: S("#dragCard"),
            inertia: true,
        });
    }
}

// ── Notes page — Snippets data ───────────────────

const snippets = {
    to: {
        title: "gsap.to()",
        desc: "Animate element FROM its current state TO the values you specify.",
        code: `gsap.to(".box", {
    x: 50,
    duration: 1,
    ease: "power1.inOut",
});`,
    },
    from: {
        title: "gsap.from()",
        desc: "Animate element FROM the values you specify TO its current state.",
        code: `gsap.from(".box", {
    scale: 0,
    duration: 1,
    ease: "back.out(2)",
});`,
    },
    fromto: {
        title: "gsap.fromTo()",
        desc: "Define both the starting values and the ending values explicitly.",
        code: `gsap.fromTo(".box", {
    scale: 0,
    rotate: 0,
}, {
    scale: 1,
    rotate: 360,
    duration: 1.2,
    ease: "power1.inOut",
});`,
    },
    set: {
        title: "gsap.set()",
        desc: "Set CSS properties instantly with zero animation.",
        code: `gsap.set(".box", {
    x: 25,
    rotation: 15,
});`,
    },
    keyframes: {
        title: "keyframes",
        desc: "Pass an array of states for the element to animate through sequentially.",
        code: `gsap.to(".box", {
    keyframes: [
        { x: 60, duration: 0.4 },
        { y: 40, duration: 0.4 },
        { x: 0,  duration: 0.4 },
        { y: 0,  duration: 0.4 },
    ],
    repeat: -1,
    ease: "power1.inOut",
});`,
    },
    stagger: {
        title: "stagger",
        desc: "Offset the start time of each element in a group animation.",
        code: `gsap.to(".dot", {
    y: -20,
    duration: 0.6,
    stagger: 0.15,
    ease: "power1.inOut",
});`,
    },
    timeline: {
        title: "timeline",
        desc: "Sequence multiple tweens to run one after another in order.",
        code: `const tl = gsap.timeline({ repeat: -1 });
tl.to(".box", { x: 40, duration: 0.4 })
  .to(".box", { rotate: 360, duration: 0.6 })
  .to(".box", { scale: 1.3, duration: 0.4 });`,
    },
    easings: {
        title: "easings",
        desc: "GSAP has built-in easing types: bounce, back, elastic, power, and more.",
        code: `gsap.to(".dot", { ease: "bounce.out" });
gsap.to(".dot", { ease: "back.out(2)" });
gsap.to(".dot", { ease: "elastic.out(1, 0.3)" });
gsap.to(".dot", { ease: "power4.inOut" });`,
    },
    callbacks: {
        title: "callbacks",
        desc: "onStart, onComplete, onUpdate — run functions at different points in the tween.",
        code: `gsap.to(".box", {
    x: 40,
    duration: 1,
    onStart: () => console.log("started"),
    onComplete: () => console.log("done"),
    onUpdate: () => console.log("updating"),
});`,
    },
    scrolltrigger: {
        title: "ScrollTrigger",
        desc: "Trigger animations based on scroll position. Requires the ScrollTrigger plugin.",
        code: `gsap.to(".box", {
    x: 200,
    scrollTrigger: {
        trigger: ".box",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
    },
});`,
    },
    utils: {
        title: "gsap.utils",
        desc: "Utility helpers: random(), clamp(), snap(), split(), etc.",
        code: `gsap.utils.random(0, 100);
gsap.utils.clamp(0, 100, value);
gsap.utils.snap(10, 47);`,
    },
    draggable: {
        title: "Draggable",
        desc: "Make any element draggable with bounds, inertia, and more. Requires the Draggable plugin.",
        code: `Draggable.create(".box", {
    bounds: ".card",
    inertia: true,
});`,
    },
};

// ── Notes page — Popup ───────────────────────────

function setupPopup() {
    const overlay = S("#overlay");
    const title = S("#modalTitle");
    const desc = S("#modalDesc");
    const code = S("#modalCode");

    SA(".gallery-card").forEach((card) => {
        card.addEventListener("click", () => {
            const data = snippets[card.dataset.note];
            if (!data) return;
            title.textContent = data.title;
            desc.textContent = data.desc;
            code.textContent = data.code;
            overlay.classList.add("open");
        });
    });

    S("#modalClose").addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("open");
    });
}

// ── Init ──────────────────────────────────────────

runAnimations();
setupPopup();
