class MediaLightbox {
  constructor(media) {
    this._media         = media

    this.$body          = document.querySelector('body')
    this.$mediaLinks    = document.querySelectorAll('.media a')
    this.$closeModalBtn = document.querySelector('#lightbox_modal svg')
    this.$lightboxModal = document.querySelector('#lightbox_modal')
  }

  get media() {
    return this._media
  }

  launchModal() {
    this.$lightboxModal.style.display = "flex"

    this.$body.classList.add('visible_modal')

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'true')
    this.$body.querySelector('main').setAttribute('aria-hidden', 'true')
    this.$lightboxModal.setAttribute('aria-hidden', 'false')
    this.$lightboxModal.setAttribute('aria-modal', 'true')
    this.$closeModalBtn.setAttribute('aria-expanded', 'true')

    // Attributes
    this.$closeModalBtn.setAttribute('aria-label', 'Fermer le formulaire de contact')
    this.$closeModalBtn.setAttribute('title', 'Fermer le formulaire de contact')
  }

  closeModal() {
    this.$lightboxModal.style.display = 'none'

    this.$body.classList.remove('visible_modal')

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'false')
    this.$body.querySelector('main').setAttribute('aria-hidden', 'false')
    this.$lightboxModal.setAttribute('aria-hidden', 'true')
    this.$lightboxModal.setAttribute('aria-modal', 'false')
    this.$closeModalBtn.setAttribute('aria-expanded', 'false')
  }

  createMediaLightbox() {
    const div = document.createElement('div')
    div.classList.add('carousel')

    const p = document.createElement('p')
    p.textContent = this._media.title

    div.innerHTML = this._media.format
    div.appendChild(p)

    return (div)
  }

  init() {    
    this.$mediaLinks.forEach((mediaLink) => mediaLink.addEventListener('click', () => this.launchModal()))
    this.$closeModalBtn.addEventListener('click', () =>this.closeModal())
  }
}