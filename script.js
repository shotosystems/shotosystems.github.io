const typeSelect = document.getElementById("type");
const categorySelect = document.getElementById("category");
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

const categories = {
  support: [
    "Website / GitHub Pages",
    "DNS / Domain / Mail",
    "System / OS",
    "Other technical support"
  ],
  contact: [
    "General request",
    "Feedback",
    "Idea / Collaboration",
    "Other"
  ]
};

// -------------------------------
// CATEGORY DROPDOWN HANDLING
// -------------------------------
typeSelect.addEventListener("change", () => {
  const value = typeSelect.value;
  categorySelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = value ? "Please choose a category…" : "Select type first…";
  categorySelect.appendChild(placeholder);

  if (!value) return;

  categories[value].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
});

// -------------------------------
// FORM SUBMIT → MAILTO GENERATION
// -------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset status
  statusEl.textContent = "";
  statusEl.classList.remove("success", "error");

  // Button → loading state
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.textContent = "Generating…";

  // Collect form data
  const type = typeSelect.value;
  const category = categorySelect.value;
  const message = document.getElementById("message").value.trim();
  const email = document.getElementById("email").value.trim();
  const time = new Date().toLocaleString("de-DE");

  // Build email body
  const body =
`Hello,

a new ticket got opened by ${email}! Please review it soon.

Ticket Details:
Type: ${type}
Category: ${category}
Time: ${time}
E-Mail: ${email}

Message:
${message}

Costumer information:
----------------------

Please note: This is an automatic generated template! Please do not change any content!

Our services are fully free and there are no hidden fees! Feel free to ask if you have questions! You can submit them through the same formular at shoto.is-a.dev!

Shoto 😄`;

  // Build mailto link
  const mailto = `mailto:contact@shoto.is-a.dev?subject=${encodeURIComponent("New Ticket (" + type + ")")}&body=${encodeURIComponent(body)}`;

  // Open mail client
  window.location.href = mailto;

  // UI feedback
  statusEl.textContent = "Your email app should now open. Please send the message manually.";
  statusEl.classList.add("success");

  submitBtn.classList.remove("loading");
  submitBtn.classList.add("success");
  submitBtn.textContent = "Ready ✓";

  // Reset form
  form.reset();
  categorySelect.innerHTML = '<option value="">Select type first…</option>';

  // Reset button after delay
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.classList.remove("success", "error");
    submitBtn.textContent = "Send";
  }, 2500);
});
