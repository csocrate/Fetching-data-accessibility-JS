class ContactForm {
  constructor(photographer) {
    this._photographer  = photographer

    this.$body          = document.querySelector('body')
    this.$openModalBtn  = document.querySelector('.photograph-header .contact_button')
    this.$closeModalBtn = document.querySelector('.close_modal')
    this.$contactModal  = document.querySelector('#contact_modal')
    this.$form          = document.querySelector('form')
  }

  get photographer() {
    return this._photographer
  }

  launchModal() {
    this.$contactModal.style.display = 'flex'

    this.$body.classList.add('visible_modal')

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'true')
    this.$body.querySelector('main').setAttribute('aria-hidden', 'true')
    this.$contactModal.setAttribute('aria-hidden', 'false')
    this.$contactModal.setAttribute('aria-modal', 'true')

    // Attributes
    this.$closeModalBtn.setAttribute('aria-label', 'Fermer le formulaire de contact')
    this.$closeModalBtn.setAttribute('title', 'Fermer le formulaire de contact')
    this.$closeModalBtn.setAttribute('aria-expanded', 'true')
  }

  closeModal() {
    this.$contactModal.style.display = 'none'

    this.$body.classList.remove('visible_modal')

    // ARIA
    this.$body.querySelector('header').setAttribute('aria-hidden', 'false')
    this.$body.querySelector('main').setAttribute('aria-hidden', 'false')
    this.$contactModal.setAttribute('aria-hidden', 'true')
    this.$contactModal.setAttribute('aria-modal', 'false')
  }

  createPhotographerName() {
    this.$contactModal.querySelector('.modal h2').textContent += ` ${this._photographer.name}`
  }

  createContactForm() {
    const contactForm = `
      <label for='firstname'>
        Prénom
      </label>
      <input type='text' name='firstname' id='firstname' autocomplete='given-name' aria-required='true'>
      <p>Le champ prénom doit être renseigné</p>
      <label for='lastname'>
        Nom
      </label>
      <input type='text' name='lastname' id='lastname' autocomplete='family-name' aria-required='true'>
      <p>Le champ nom doit être renseigné</p>
      <label for='email'>
        Email
      </label>
      <input type='email' name='email' id='email' autocomplete='email' aria-required='true'>
      <p>Le champ email doit être renseigné</p>
      <label for=''>
        Votre message
      </label>
      <textarea name='message' id='message' cols='30' rows='10' autocomplete='on' aria-required='true'></textarea>
      <p>Le champ message doit être renseigné</p>`

    this.$form.querySelector('div').innerHTML = contactForm
  }

  isInputNotEmpty() {
    const firstname = this.$form.firstname
    const lastname  = this.$form.lastname
    const email     = this.$form.email
    const message   = this.$form.message

    let result = true

    if (!firstname.value.length) {
      firstname.dataset.errorVisible = "true"
      firstname.setAttribute('aria-invalid', 'true')
      this.$form.querySelector('input[id=firstname] ~ p').style.display = "block"
      result = false
    } else {
      console.log(`Prénom: ${firstname.value}`)
      firstname.dataset.errorVisible = "false"
      firstname.setAttribute('aria-invalid', 'false')
      this.$form.querySelector('input[id=firstname] ~ p').style.display = "none"
    }

    if (!lastname.value.length) {
      lastname.dataset.errorVisible = "true"
      lastname.setAttribute('aria-invalid', 'true')
      this.$form.querySelector('input[id=lastname] ~ p').style.display = "block"
      result = false
    } else {
      console.log(`Nom: ${lastname.value}`)
      lastname.dataset.errorVisible = "false"
      lastname.setAttribute('aria-invalid', 'false')
      this.$form.querySelector('input[id=lastname] ~ p').style.display = "none"
    }

    if (!email.value.length) {
      email.dataset.errorVisible = "true"
      email.setAttribute('aria-invalid', 'true')
      this.$form.querySelector('input[id=email] ~ p').style.display = "block"
      result = false
    } else {
      console.log(`Email: ${email.value}`)
      email.dataset.errorVisible = "false"
      email.setAttribute('aria-invalid', 'false')
      this.$form.querySelector('input[id=email] ~ p').style.display = "none"
    }

    if (!message.value.length) {
      message.dataset.errorVisible = "true"
      message.setAttribute('aria-invalid', 'true')
      this.$form.querySelector('textarea ~ p').style.display = "block"
      result = false
    } else {
      console.log(`Message: ${message.value}`)
      message.dataset.errorVisible = "false"
      message.setAttribute('aria-invalid', 'false')
      this.$form.querySelector('textarea ~ p').style.display = "none"
    }

    if (result === true) {
      console.log("Merci pour votre message.")
    }
  }
  
  submitForm() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.isInputNotEmpty()
    })
  }

  init() {
    this.$openModalBtn.addEventListener('click', () => this.launchModal())
    this.$closeModalBtn.addEventListener('click', () => this.closeModal())
    this.createContactForm()
    this.submitForm()
  }
}