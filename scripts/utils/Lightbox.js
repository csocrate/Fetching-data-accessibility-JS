class Lightbox {
  constructor() {
    this.$body          = document.querySelector('body')
    this.$openModal     = document.querySelectorAll('.media a')
    this.$closeModalBtn = document.querySelector('#lightbox_modal svg')
    this.$lightboxModal = document.querySelector('#lightbox_modal')
  }

  get media() {
    return this._media
  }

  displayModal() {
    /**
     * After DOM elements loaded
     */
    setTimeout(() => {

      const mediaLinks    = document.querySelectorAll('.media a')
      const lightboxModal = document.querySelector('#lightbox_modal')
      mediaLinks.forEach((media) => media.addEventListener('click', () => {

        lightboxModal.style.display = "flex"

        this.$body.classList.add('visible_modal')
        this.$body.querySelector('header').setAttribute('aria-hidden', 'true')
        this.$body.querySelector('main').setAttribute('aria-hidden', 'true')
        lightboxModal.setAttribute('aria-hidden', 'false')
        lightboxModal.setAttribute('aria-modal', 'true')
  
        this.$closeModalBtn.setAttribute('aria-label', 'Fermer le formulaire de contact')
        this.$closeModalBtn.setAttribute('title', 'Fermer le formulaire de contact')
        this.$closeModalBtn.setAttribute('aria-expanded', 'true')
      }))
    },100)
  }

  closeModal() {
    this.$closeModalBtn.addEventListener('click', () => {

      this.$lightboxModal.style.display = 'none'

      this.$body.classList.remove('visible_modal')
      this.$body.querySelector('header').setAttribute('aria-hidden', 'false')
      this.$body.querySelector('main').setAttribute('aria-hidden', 'false')
      this.$lightboxModal.setAttribute('aria-hidden', 'true')
      this.$lightboxModal.setAttribute('aria-modal', 'false')
      this.$closeModalBtn.setAttribute('aria-expanded', 'false')
    })
  }

  render() {
    this.displayModal()
    this.closeModal()
  }
}