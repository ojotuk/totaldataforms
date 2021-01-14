import gsap from "gsap";

export const fromBottom = (elem) => {
  gsap.from(elem, {
    yPercent: 30,
    opacity: 1,
    duration: 0.5,
  });
};
