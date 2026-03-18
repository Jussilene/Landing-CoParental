const PAYMENT_URL = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=93993b12f1834398b6cc8b804d1d16a3";

const modal = document.querySelector(".checkout-modal");
const modalCloseButtons = document.querySelectorAll("[data-close-checkout]");
const modalOpenButtons = document.querySelectorAll("[data-open-checkout]");
const continueCheckout = document.getElementById("continue-checkout");
const allButtons = document.querySelectorAll(".button");
const interactiveCards = document.querySelectorAll([
  ".mini-card",
  ".pain-card",
  ".benefit-card",
  ".showcase-card",
  ".testimonial-card",
  ".faq-list details",
  ".modal-points article",
  ".difference-chips span",
  ".flow-step"
].join(", "));
const revealTargets = document.querySelectorAll([
  ".hero",
  ".video-section .section-header",
  ".video-card",
  ".video-section .section-cta",
  ".pain-section .section-header",
  ".pain-card",
  ".attention-section .section-header",
  ".attention-card",
  ".solution-section .section-header",
  ".benefit-card",
  ".showcase-section .section-header",
  ".showcase-card",
  ".mockup-wrap",
  ".difference-panel",
  ".proof-section .section-header",
  ".testimonial-card",
  ".steps-section .section-header",
  ".flow-step",
  ".offer-section .section-header",
  ".pricing-card",
  ".urgency-card",
  ".faq-section .section-header",
  ".faq-list details",
  ".final-panel"
].join(", "));
const parallaxTargets = document.querySelectorAll([
  ".hero",
  ".video-card",
  ".promo-vertical-frame",
  ".phone-shell",
  ".difference-panel",
  ".pricing-card",
  ".urgency-card",
  ".final-panel"
].join(", "));

const openCheckoutModal = () => {
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeCheckoutModal = () => {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

continueCheckout.setAttribute("href", PAYMENT_URL);

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", openCheckoutModal);
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCheckoutModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeCheckoutModal();
  }
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) {
      return;
    }

    document.querySelectorAll(".faq-list details").forEach((item) => {
      if (item !== detail) {
        item.open = false;
      }
    });
  });
});

revealTargets.forEach((element, index) => {
  element.classList.add("reveal-on-scroll", "is-visible");
  element.dataset.revealIndex = String(index % 6);

  const parent = element.parentElement;
  const siblings = parent ? Array.from(parent.children).filter((child) => child.matches(element.tagName.toLowerCase()) || child.className === element.className) : [];
  const localIndex = siblings.indexOf(element);

  let fromX = 0;
  let fromY = 88;
  let fromRotate = 0;

  if (element.matches(".pain-card")) {
    fromX = localIndex % 3 === 0 ? -90 : localIndex % 3 === 2 ? 90 : 0;
    fromY = localIndex < 3 ? 70 : 110;
    fromRotate = localIndex % 2 === 0 ? -3.5 : 3.5;
  } else if (element.matches(".benefit-card")) {
    fromX = localIndex % 2 === 0 ? -72 : 72;
    fromY = 76 + (localIndex * 6);
    fromRotate = localIndex % 2 === 0 ? -2.5 : 2.5;
  } else if (element.matches(".showcase-card")) {
    fromX = element.closest(".showcase-column")?.matches(":first-child") ? -96 : 96;
    fromY = 64 + (localIndex * 10);
    fromRotate = fromX < 0 ? -3 : 3;
  } else if (element.matches(".testimonial-card")) {
    fromX = localIndex % 2 === 0 ? -110 : 110;
    fromY = 82;
    fromRotate = localIndex % 2 === 0 ? -2 : 2;
  } else if (element.matches(".flow-step")) {
    fromX = localIndex % 2 === 0 ? -36 : 36;
    fromY = 96 + (localIndex * 12);
    fromRotate = localIndex % 2 === 0 ? -4 : 4;
  } else if (element.matches(".mini-card")) {
    fromX = localIndex === 0 ? -70 : localIndex === 2 ? 70 : 0;
    fromY = 52;
    fromRotate = localIndex === 1 ? 0 : localIndex === 0 ? -2 : 2;
  } else if (element.matches(".pricing-card, .attention-card, .difference-panel, .urgency-card, .final-panel")) {
    fromY = 96;
    fromRotate = -1.2;
  } else if (element.matches(".faq-list details")) {
    fromX = localIndex % 2 === 0 ? -44 : 44;
    fromY = 54;
    fromRotate = localIndex % 2 === 0 ? -1.4 : 1.4;
  }

  element.style.setProperty("--reveal-from-x", `${fromX}px`);
  element.style.setProperty("--reveal-from-y", `${fromY}px`);
  element.style.setProperty("--reveal-from-rotate", `${fromRotate}deg`);
});

const updateCardTilt = (element, clientX, clientY) => {
  const rect = element.getBoundingClientRect();
  const relativeX = (clientX - rect.left) / rect.width;
  const relativeY = (clientY - rect.top) / rect.height;
  const rotateY = (relativeX - 0.5) * 8;
  const rotateX = (0.5 - relativeY) * 8;

  element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
  element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  element.style.setProperty("--spot-x", `${(relativeX * 100).toFixed(2)}%`);
  element.style.setProperty("--spot-y", `${(relativeY * 100).toFixed(2)}%`);
};

const resetCardTilt = (element) => {
  element.style.setProperty("--tilt-x", "0deg");
  element.style.setProperty("--tilt-y", "0deg");
  element.style.setProperty("--spot-x", "50%");
  element.style.setProperty("--spot-y", "50%");
  element.classList.remove("is-active");
};

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    card.classList.add("is-active");
    updateCardTilt(card, event.clientX, event.clientY);
  });

  card.addEventListener("pointerleave", () => {
    resetCardTilt(card);
  });

  card.addEventListener("pointerdown", (event) => {
    card.classList.add("is-active");
    updateCardTilt(card, event.clientX, event.clientY);
  });

  card.addEventListener("pointerup", () => {
    window.setTimeout(() => resetCardTilt(card), 180);
  });
});

const updateParallax = () => {
  const viewportHeight = window.innerHeight || 1;

  parallaxTargets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const progress = ((rect.top + rect.height / 2) / viewportHeight) - 0.5;
    const shift = Math.max(-10, Math.min(10, progress * -14));
    element.style.setProperty("--section-shift", shift.toFixed(2));
  });
};

const updateScrollLinkedReveal = () => {
  const viewportHeight = window.innerHeight || 1;

  revealTargets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const indexOffset = Number(element.dataset.revealIndex || 0) * 0.03;
    const rawProgress = (viewportHeight * 0.92 - rect.top) / (viewportHeight * 0.88 + rect.height);
    const progress = Math.max(0, Math.min(1, rawProgress - indexOffset));
    const eased = 1 - ((1 - progress) ** 3);
    const baseX = parseFloat(element.style.getPropertyValue("--reveal-from-x")) || 0;
    const baseY = parseFloat(element.style.getPropertyValue("--reveal-from-y")) || 72;
    const baseRotate = parseFloat(element.style.getPropertyValue("--reveal-from-rotate")) || 0;
    const translateX = (1 - eased) * baseX;
    const translateY = (1 - eased) * baseY;
    const scale = 0.935 + (eased * 0.065);
    const opacity = 0.16 + (eased * 0.84);
    const rotate = (1 - eased) * baseRotate;

    element.style.setProperty("--fx-x", `${translateX.toFixed(2)}px`);
    element.style.setProperty("--fx-y", `${translateY.toFixed(2)}px`);
    element.style.setProperty("--fx-scale", scale.toFixed(3));
    element.style.setProperty("--fx-opacity", opacity.toFixed(3));
    element.style.setProperty("--fx-rotate", `${rotate.toFixed(2)}deg`);
  });
};

let ticking = false;
const syncScrollEffects = () => {
  updateParallax();
  updateScrollLinkedReveal();
  ticking = false;
};

const requestScrollEffects = () => {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(syncScrollEffects);
};

syncScrollEffects();
window.addEventListener("scroll", requestScrollEffects, { passive: true });
window.addEventListener("resize", requestScrollEffects);

allButtons.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    const ripple = document.createElement("span");
    ripple.className = "tap-ripple";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    window.setTimeout(() => {
      ripple.remove();
    }, 520);
  });
});
