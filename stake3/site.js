
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-site-header]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const yearTargets = document.querySelectorAll('[data-current-year]');
  const faqItems = document.querySelectorAll('[data-faq-item]');
  const refreshHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  refreshHeader();
  window.addEventListener('scroll', refreshHeader, { passive: true });
  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', () => {
      const open = mobilePanel.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
    mobilePanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobilePanel.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const headerOffset = header ? header.offsetHeight + 10 : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  });
  faqItems.forEach((item, index) => {
    const button = item.querySelector('[data-faq-button]');
    if (!button) return;
    const open = index === 0;
    item.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach((other) => {
        other.classList.remove('is-open');
        const otherButton = other.querySelector('[data-faq-button]');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
  yearTargets.forEach((node) => { node.textContent = String(new Date().getFullYear()); });
});
