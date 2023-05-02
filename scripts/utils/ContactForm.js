class ContactForm {
  constructor(photographer) {
    this._photographer  = photographer
    
    this.$contactModal  = document.querySelector('#contact_modal')
    this.$contactButton = document.querySelector('.contact_button')
    this.$closeModal    = document.querySelector('.close_modal')
    this.$body          = document.querySelector('body')
    this.$header        = document.querySelector('header')
    this.$main          = document.querySelector('#main')
    // this.$contactTitle  = document.querySelector('.modal h2')
  }

  get photographer() {
    return this._photographer
  }

  createPhotographerName() {

    const h3 = document.createElement('h3')
    h3.textContent = this._photographer.name

    return (h3)
  }

  displayModal() {
    this.$contactButton.addEventListener('click', () => {

      this.$contactModal.style.display = "flex"

      this.$body.classList.add("visible_modal")
      this.$header.setAttribute('aria-hidden', 'true')
      this.$main.setAttribute('aria-hidden', 'true')
    })
  }

  closeModal() {
      this.$closeModal.addEventListener('click', () => {

        this.$contactModal.style.display = "none"

        this.$body.classList.remove("visible_modal");

        this.$header.setAttribute('aria-hidden', 'false')
        this.$main.setAttribute('aria-hidden', 'false')
      })
  }

  render() {
    this.displayModal()
    this.closeModal()
  }
}