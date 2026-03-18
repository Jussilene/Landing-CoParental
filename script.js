const PAYMENT_URL = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=93993b12f1834398b6cc8b804d1d16a3";

const modal = document.querySelector(".checkout-modal");
const modalCloseButtons = document.querySelectorAll("[data-close-checkout]");
const modalOpenButtons = document.querySelectorAll("[data-open-checkout]");
const continueCheckout = document.getElementById("continue-checkout");
const allButtons = document.querySelectorAll(".button");

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
