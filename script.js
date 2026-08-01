const WAITLIST_EMAIL = "edtoulet@gmail.com";

/* ---------- Toggle mensuel / annuel ---------- */
const billingSwitch = document.getElementById("billingSwitch");
const billingLabels = document.querySelectorAll(".billing-toggle__label");
const amounts = document.querySelectorAll(".price-card__amount");
const billedLines = document.querySelectorAll(".price-card__billed");

function setBilling(yearly) {
  billingSwitch.setAttribute("aria-checked", String(yearly));
  billingLabels.forEach((el) => {
    el.dataset.active = String((el.dataset.target === "yearly") === yearly);
  });
  amounts.forEach((el) => {
    const value = yearly ? el.dataset.yearly : el.dataset.monthly;
    el.textContent = `${value} €`;
  });
  billedLines.forEach((el) => {
    el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
  });
}

billingSwitch?.addEventListener("click", () => {
  const isYearly = billingSwitch.getAttribute("aria-checked") === "true";
  setBilling(!isYearly);
});

/* ---------- Formulaire liste d'attente (mailto) ---------- */
const form = document.getElementById("waitlistForm");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const count = form.count.value.trim();
  const message = form.message.value.trim();

  const subject = `Liste d'attente AirCover Manager — ${name || "nouvel hôte"}`;
  const bodyLines = [
    `Nom : ${name}`,
    `Email : ${email}`,
    count ? `Nombre de logements gérés : ${count}` : null,
    message ? `Message : ${message}` : null,
  ].filter(Boolean);

  const mailto = `mailto:${WAITLIST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
});
