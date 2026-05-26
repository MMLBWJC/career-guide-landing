const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 960;

function applyScale() {
  const scale = window.innerWidth / DESIGN_WIDTH;
  document.documentElement.style.setProperty("--scale", scale.toString());
  document.body.style.height = `${DESIGN_HEIGHT * scale}px`;
}

applyScale();
window.addEventListener("resize", applyScale);

const firstTitle = document.querySelector(".hero h1 span:first-child");
firstTitle.innerHTML = firstTitle.textContent.replace(
  "认识自己",
  "<span class=\"gold\" aria-label=\"认识自己\"><span class=\"gold-char\">认</span><span class=\"gold-char\">识</span><span class=\"gold-char\">自</span><span class=\"gold-char\">己</span></span>"
);

if (window.gsap) {
  gsap.defaults({ ease: "power3.out", duration: 0.8 });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set(".brand, .profile, .eyebrow, .hero h1 span, .gold-char, .unlock, .tiny-rule, .step-card, .flow-arrow, .info-strip", {
      opacity: 1,
      visibility: "visible",
      clearProps: "transform"
    });
  } else {
    gsap.set(".brand, .profile, .eyebrow, .hero h1 > span, .gold-char, .unlock, .tiny-rule, .step-card, .flow-arrow, .info-strip", {
      opacity: 1,
      visibility: "visible",
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      scaleX: 1,
      scale: 1
    });

    const intro = gsap.timeline({ defaults: { duration: 0.58, ease: "power3.out" } });

    intro
      .fromTo(".brand", { opacity: 0.35, y: -6 }, { opacity: 1, y: 0, clearProps: "transform" })
      .fromTo(".profile", { opacity: 0.35, y: -6 }, { opacity: 1, y: 0, clearProps: "transform" }, "<0.08")
      .fromTo(".eyebrow", { opacity: 0.35, y: 6 }, { opacity: 1, y: 0 }, "-=0.24")
      .fromTo(".hero h1 > span", { opacity: 0.3, y: 10 }, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.22")
      .fromTo(".gold-char", {
        opacity: 0,
        y: 20,
        rotationX: -78,
        z: -32
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        z: 0,
        duration: 0.52,
        stagger: 0.11,
        ease: "back.out(1.8)"
      }, "-=0.42")
      .fromTo(".unlock", { opacity: 0.38, y: 6 }, { opacity: 1, y: 0 }, "-=0.28")
      .fromTo(".tiny-rule", { opacity: 0.35, scaleX: 0.2 }, { opacity: 1, scaleX: 1, transformOrigin: "50% 50%", clearProps: "transform" }, "-=0.18")
      .fromTo(".step-card", {
        opacity: 0.08,
        y: 34,
        z: -220,
        rotationY: -64,
        rotationX: 12,
        transformOrigin: "50% 50%"
      }, {
        opacity: 1,
        y: 0,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.92,
        stagger: 0.16,
        ease: "back.out(1.35)"
      }, "-=0.08")
      .fromTo(".flow-arrow", { opacity: 0.35, x: -6 }, { opacity: 1, x: 0, stagger: 0.1 }, "-=0.48")
      .fromTo(".info-strip", { opacity: 0.35, y: 8 }, { opacity: 1, y: 0, clearProps: "transform" }, "-=0.26");

    gsap.to(".grain", {
      x: 26,
      y: -20,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".brand-mark", {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%"
    });

    gsap.to(".avatar", {
      y: -2,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".cta", {
      scale: 1.035,
      duration: 1.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".flow-arrow", {
      x: 6,
      opacity: 0.65,
      duration: 1.05,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut"
    });

    gsap.to(".step-card", {
      y: (index) => (index % 2 === 0 ? -3 : 3),
      delay: 2.6,
      duration: 3.1,
      repeat: -1,
      yoyo: true,
      stagger: 0.28,
      ease: "sine.inOut"
    });

    gsap.to(".card-icon", {
      opacity: 0.8,
      scale: 1.08,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      stagger: 0.24,
      ease: "sine.inOut"
    });

    gsap.to(".info-icon", {
      rotation: (index) => (index === 1 ? 0 : 360),
      scale: 1.08,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      stagger: 0.18,
      ease: "sine.inOut",
      transformOrigin: "50% 50%"
    });
  }
}
