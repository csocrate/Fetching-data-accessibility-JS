class ContactForm {
  constructor(photographer) {
    this._photographer  = photographer
    
    this.$contactModal  = document.querySelector('#contact_modal')
    this.$contactButton = document.querySelector('.contact_button')
    this.$closeModal    = document.querySelector('.close_modal')
    this.$body          = document.querySelector('body')
  }

  get photographer() {
    return this._photographer
  }

  displayModal() {
    this.$contactButton.addEventListener('click', () => {

      this.$contactModal.style.display = "flex"

      this.$body.classList.add("visible_modal")
      this.$body.querySelector('header').setAttribute('aria-hidden', 'true')
      this.$body.querySelector('main').setAttribute('aria-hidden', 'true')
      this.$contactModal.setAttribute('aria-hidden', 'false')
    })
  }

  closeModal() {
      this.$closeModal.addEventListener('click', () => {

        this.$contactModal.style.display = "none"

        this.$body.classList.remove("visible_modal")
        this.$body.querySelector('header').setAttribute('aria-hidden', 'false')
        this.$body.querySelector('main').setAttribute('aria-hidden', 'false')
        this.$contactModal.setAttribute('aria-hidden', 'true')
      })
  }

  createPhotographerName() {
    this.$contactModal.querySelector('.modal h2').textContent += ` ${this._photographer.name}`
  }

  createContactForm() {
    const contactForm = `
      <label for="firstname">
        Prénom
      </label>
      <input type="text" name="firstname" id="firstname" autocomplete="given-name" aria-required="true" required>
      <label for="lastname">
        Nom
      </label>
      <input type="text" name="lastname" id="lastname" autocomplete="family-name">
      <label for="email">
        Email
      </label>
      <input type="email" name="email" id="email" autocomplete="email" aria-required="true" required>
      <label for="">
        Votre message
      </label>
      <textarea name="message" id="message" cols="30" rows="10" autocomplete="on" aria-required="true" required></textarea>`

    this.$contactModal.querySelector('form > div').innerHTML = contactForm
  }

  render() {
    this.displayModal()
    this.closeModal()
    this.createContactForm()
  }
}