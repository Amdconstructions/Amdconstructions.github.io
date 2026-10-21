(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      }
    });
  }

  // Keep the layout attractive if an external reference photo cannot be loaded.
  document.querySelectorAll('img[src^="https://images.unsplash.com/"]').forEach(image => {
    image.addEventListener('error', () => {
      image.classList.add('image-load-failed');
      image.setAttribute('aria-hidden', 'true');
      image.style.display = 'none';
      const parent = image.closest('.hero-image-wrap, .project-card');
      if (parent) parent.classList.add('image-fallback');
    }, { once: true });
  });

  const form = document.getElementById('enquiry-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = [
        'Hello AMD Constructions and Paint Services,',
        '',
        'I would like to enquire about a project.',
        `Name: ${String(data.get('name') || '').trim()}`,
        `Phone: ${String(data.get('phone') || '').trim()}`,
        `Project type: ${String(data.get('type') || '').trim()}`,
        `Project details: ${String(data.get('message') || '').trim()}`
      ].join('\n');
      if (note) note.textContent = 'Opening WhatsApp with your enquiry. Please review the message and press Send in WhatsApp.';
      const url = `https://wa.me/918109423456?text=${encodeURIComponent(message)}`;
      const opened = window.open(url, '_blank');
      if (opened) opened.opener = null;
      else window.location.href = url;
    });
  }
})();
