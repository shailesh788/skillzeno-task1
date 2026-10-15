const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !isOpen);
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('is-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
const fields = {
  name: { input: document.querySelector('#name'), error: document.querySelector('#name-error') },
  email: { input: document.querySelector('#email'), error: document.querySelector('#email-error') },
  message: { input: document.querySelector('#message'), error: document.querySelector('#message-error') },
};
function validateField(key) {
  const { input, error } = fields[key];
  const value = input.value.trim();
  let message = '';
  if (!value) message = 'Please fill out this field.';
  else if (key === 'name' && value.length < 2) message = 'Please enter at least 2 characters.';
  else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address.';
  else if (key === 'message' && value.length < 10) message = 'Please add a little more detail (10 characters minimum).';
  error.textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message)));
  input.setAttribute('aria-describedby', `${key}-error`);
  return !message;
}
Object.entries(fields).forEach(([key, { input }]) => {
  input.addEventListener('blur', () => validateField(key));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(key);
    formNote.textContent = 'Your email app will open with your note ready to send.';
    formNote.classList.remove('success');
  });
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = Object.keys(fields).map(validateField).every(Boolean);
  if (!isValid) {
    form.querySelector('[aria-invalid="true"]').focus();
    formNote.textContent = 'Please check the highlighted fields and try again.';
    formNote.classList.remove('success');
    return;
  }
  const name = fields.name.input.value.trim();
  const email = fields.email.input.value.trim();
  const message = fields.message.input.value.trim();
  const subject = encodeURIComponent(`Portfolio hello from ${name}`);
  const body = encodeURIComponent(`Hi! I'm ${name} (${email}).\n\n${message}`);
  formNote.textContent = 'Opening your email app with your note ready to send…';
  formNote.classList.add('success');
  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
});
const revealItems = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item) => item.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}


