(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const form = document.querySelector('[data-inquiry-form]');
  const status = form?.querySelector('.form-status');
  const config = window.VISIONARY_CONFIG || { formEndpoint: '' };

  const showStatus = (message, kind) => {
    if (!status) return;
    status.hidden = false;
    status.className = `form-status ${kind}`;
    status.textContent = message;
  };

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      showStatus('Please complete the required fields before sending your inquiry.', 'error');
      return;
    }

    const endpoint = String(config.formEndpoint || '').trim();
    if (!endpoint) {
      showStatus('The form is ready, but no recipient endpoint is configured in this local prototype. Connect FORM_ENDPOINT before production use.', 'success');
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) { submitButton.disabled = true; submitButton.setAttribute('aria-busy', 'true'); }
    showStatus('Sending your inquiry…', 'success');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      showStatus('Thank you. Your inquiry has been sent for review.', 'success');
    } catch {
      showStatus('We could not send the inquiry right now. Please try again or use an approved company contact method.', 'error');
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.removeAttribute('aria-busy'); }
    }
  });
})();
