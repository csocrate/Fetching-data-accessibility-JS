class Modal {
  constructor(body, modal, launchingTarget, closingTarget) {
    this.$body            = document.querySelector(body);
    this.$modal           = document.querySelector(modal);
    this.$launchingTarget = document.querySelectorAll(launchingTarget);
    this.$closingTarget   = document.querySelector(closingTarget);
    this.getModal();
  }

  launchModal() {
    this.$modal.style.display = 'flex';

    this.$body.classList.add('visible_modal');

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'true');
    this.$body.querySelector('main').setAttribute('aria-hidden', 'true');
    this.$modal.setAttribute('aria-hidden', 'false');
    this.$modal.setAttribute('aria-modal', 'true');
    this.$closingTarget.setAttribute('aria-label', 'Fermer le formulaire de contact');
    this.$closingTarget.setAttribute('aria-expanded', 'true');

    this.$closingTarget.setAttribute('title', 'Fermer le formulaire de contact');
  }

  closeModal() {
    this.$modal.style.display = 'none';

    this.$body.classList.remove('visible_modal');

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'false');
    this.$body.querySelector('main').setAttribute('aria-hidden', 'false');
    this.$modal.setAttribute('aria-hidden', 'true');
    this.$modal.setAttribute('aria-modal', 'false');
    this.$closingTarget.setAttribute('aria-expanded', 'false');
  }

  onKeyUpModal(e) {
    if (this.$modal.style.display !== 'none') {
      if (e.key === 'Escape') {
        this.closeModal(e);
      }
    }
  }

  getModal() {
    this.$launchingTarget.forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      this.launchModal();
    }));

    this.$closingTarget.addEventListener('click', e => {
      e.preventDefault();
      this.closeModal(e);
    });

    document.addEventListener('keyup', e => {
      this.onKeyUpModal(e)
    });
  }
}