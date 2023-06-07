/**
 * ------------------------------------------------------------
 * Fisheye utils/ContactForm.js
 * ------------------------------------------------------------
 */

 class ContactForm extends Modal {
   /**
    * @param {HTMLElement} body - body element
    * @param {HTMLElement} modal - modal element
    * @param {HTMLElement} launchingTarget - trigger element that opens modal
    * @param {HTMLElement} closingTarget - trigger element that close modal
    * @param {Object} photographer - list of objects from .json file
    */
  constructor(body, modal, launchingTarget, closingTarget, photographer) {

    super(body, modal, launchingTarget, closingTarget);

    this._photographer  = photographer;

    this.$form = document.querySelector('form');    
  }

  get photographer() {
    return this._photographer;
  }

  /**
   * Opens modal, add attributes and keep focus inside modal
   * @see keepFocusInsideModal()
   */
  launchModal() {
    super.launchModal();
    this.$closingTarget.setAttribute('aria-label', 'Fermer le formulaire de contact');
    this.$closingTarget.setAttribute('title', 'Fermer le formulaire de contact');

    this.keepFocusInsideModal() ;
  }

  /**
   * Adds photographer's name in banner
   */
  createPhotographerName() {
    this.$modal.querySelector('.modal h2').textContent += ` ${this._photographer.name}`;
  }

  /**
   * Template contact form
   * With error messages
   */
  createContactForm() {
    const fieldsContainer = this.$form.querySelector('div');

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
      <label for='message'>
        Votre message
      </label>
      <textarea name='message' id='message' cols='30' rows='10' autocomplete='on' aria-required='true'></textarea>
      <p>Le champ message doit être renseigné</p>`;

    fieldsContainer.innerHTML = contactForm;
  }

  /**
   * Check if fields are valid
   * If not, errors message will appear on form submission
   * Aria attributes depends on result about form submission
   * The focus is keep inside modal if result is false
   * If result is true, success message on console
   * then focus cis put on logo
   * @see keepFocusInsideModal()
   */
  isInputNotEmpty() {
    const firstname = this.$form.firstname;
    const lastname  = this.$form.lastname;
    const email     = this.$form.email;
    const message   = this.$form.message;

    let result = true;

    if (!firstname.value.length) {
      firstname.dataset.errorVisible = 'true';
      firstname.setAttribute('aria-invalid', 'true');
      this.$form.querySelector('input[id=firstname] ~ p').style.display = 'block';
      result = false;
    } else {
      console.log(`Prénom: ${firstname.value}`);
      firstname.dataset.errorVisible = 'false';
      firstname.setAttribute('aria-invalid', 'false');
      this.$form.querySelector('input[id=firstname] ~ p').style.display = 'none';
    }

    if (!lastname.value.length) {
      lastname.dataset.errorVisible = 'true';
      lastname.setAttribute('aria-invalid', 'true');
      this.$form.querySelector('input[id=lastname] ~ p').style.display = 'block';
      result = false;
    } else {
      console.log(`Nom: ${lastname.value}`);
      lastname.dataset.errorVisible = 'false';
      lastname.setAttribute('aria-invalid', 'false');
      this.$form.querySelector('input[id=lastname] ~ p').style.display = 'none';
    }

    if (!email.value.length) {
      email.dataset.errorVisible = 'true';
      email.setAttribute('aria-invalid', 'true');
      this.$form.querySelector('input[id=email] ~ p').style.display = 'block';
      result = false;
    } else {
      console.log(`Email: ${email.value}`);
      email.dataset.errorVisible = 'false';
      email.setAttribute('aria-invalid', 'false');
      this.$form.querySelector('input[id=email] ~ p').style.display = 'none';
    }

    if (!message.value.length) {
      message.dataset.errorVisible = 'true';
      message.setAttribute('aria-invalid', 'true');
      this.$form.querySelector('textarea ~ p').style.display = 'block';
      result = false;
    } else {
      console.log(`Message: ${message.value}`);
      message.dataset.errorVisible = 'false';
      message.setAttribute('aria-invalid', 'false');
      this.$form.querySelector('textarea ~ p').style.display = 'none';
    }

    if (result === true) {
      this.closeModal()
      console.log('Merci pour votre message.');

      // To free focus on modal
      const logoLink = document.querySelector('.site-header a')
      logoLink.focus();

    } else {
      this.keepFocusInsideModal();
    }
  }
  
/**
 * Handle implementation form inputs and user responses
 * when submit event is fires
 */
  submitForm() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the form being submitted
      this.isInputNotEmpty();
    })
  }

  /**
   * Focus is keep between first and last form elements
   * Until successfull submission
   * Using Tab key
   */
  keepFocusInsideModal() {
    const formElements            = 'input[type=text], input[type=email], textarea, button[type=submit]';
    const insideFocusElements     = Array
      .from(this.$modal.querySelectorAll(formElements));

    const firstInsideFocusElement = insideFocusElements[0];
    const lastInsideFocusElement  = insideFocusElements[insideFocusElements.length -1];
    
    if (this.$body.classList.contains('visible_modal')) {
      this.$modal.focus();
    }    
    
    this.$modal.addEventListener('keydown', e => {

      if (this.$modal.style.display !== 'none') {
      
        let isTab = e.key === 'Tab' || e.code === 9;
        
        if (!isTab) {
          return;
        }
    
        if (isTab) {  
          if (document.activeElement === lastInsideFocusElement) {
            firstInsideFocusElement.focus();
            e.preventDefault(); // Prevent losing focus
          }
        }
      }
    });
  }

  init() {
    this.createContactForm();
    this.submitForm();
  }
}