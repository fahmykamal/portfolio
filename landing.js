const SA = (sel, ctx) => (ctx || document).querySelectorAll(sel);

gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".nav", { y: -30, opacity: 0, duration: 0.6 })
    .from("#heroGreeting", { y: 30, opacity: 0, duration: 0.5 })
    .from("#heroName", { y: 40, opacity: 0, duration: 0.6 })
    .from("#heroTagline", { y: 30, opacity: 0, duration: 0.5 });

SA(".bg-floats span").forEach((el) => {
    gsap.set(el, {
        left: gsap.utils.random(5, 85) + "%",
        top: gsap.utils.random(5, 85) + "%",
    });

    gsap.to(el, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-25, 25),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(1, 10),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });
});

const cards = SA(".project-card");
const countEl = document.getElementById("projectsCount");

if (countEl) {
    countEl.textContent = String(cards.length).padStart(2, "0");
}

if (cards.length) {
    gsap.from(".projects-head", {
        scrollTrigger: { trigger: ".projects", start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
    });

    gsap.from(cards, {
        scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
    });
}
