class ContactForm extends Modal {
  constructor(body, modal, launchingTarget, closingTarget, photographer) {

    super(body, modal, launchingTarget, closingTarget);

    this._photographer  = photographer;

    this.$form = document.querySelector('form');    
  }

  get photographer() {
    return this._photographer;
  }

  // getModal() {
  //   super.getModal();
  //   document.removeEventListener('keyup', e => {
  //     this.onKeyUpModal(e)
  //   },
  //   true);
  // }

  launchModal() {
    super.launchModal();
    this.$closingTarget.setAttribute('aria-label', 'Fermer le formulaire de contact');
    this.$closingTarget.setAttribute('title', 'Fermer le formulaire de contact');

    this.keepFocusInsideModal() ;
  }

  createPhotographerName() {
    this.$modal.querySelector('.modal h2').textContent += ` ${this._photographer.name}`;
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
      <label for='message'>
        Votre message
      </label>
      <textarea name='message' id='message' cols='30' rows='10' autocomplete='on' aria-required='true'></textarea>
      <p>Le champ message doit être renseigné</p>`;

    this.$form.querySelector('div').innerHTML = contactForm;
  }

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
    } else {
      this.keepFocusInsideModal();
    }
  }
  
  submitForm() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.isInputNotEmpty();
    })
  }

  keepFocusInsideModal() {
    const formElements            = 'input[type=text], input[type=email], textarea, button[type=submit]';
    const insideFocusElements     = Array
      .from(this.$modal.querySelectorAll(formElements));

    const firstInsideFocusElement = insideFocusElements[0];
    const lastInsideFocusElement  = insideFocusElements[insideFocusElements.length -1];
    
    this.$modal
      .focus();    
    
    // this.getModal();
    
    this.$modal.addEventListener('keydown', e => {;
      
      let isTab = e.key === 'Tab' || e.code === 9;
      let isEsc = e.key === 'Escape';

      if (!isTab) {
        return;
      }

      // if (!isTab || !isEsc) {
      //   return;
      // }

      // if (this.$modal.style.display !== 'none') {
      //   if (isEsc) {
      //     this.closeModal(e);
      //   }
      // }
  
      if (isTab) {
      
        if (e.shiftKey) {
          // Boolean on element that currently has focus
          if (document.activeElement === firstInsideFocusElement) {
            lastInsideFocusElement.focus();
            e.preventDefault();
          } 
          else {
            if (document.activeElement === lastInsideFocusElement) {
              firstInsideFocusElement.focus();
              e.preventDefault();
            }
          }
        }

        if (document.activeElement === lastInsideFocusElement) {
          firstInsideFocusElement.focus();
          e.preventDefault();
        }
      }
    });
    firstInsideFocusElement.focus();
  }

  init() {
    this.createContactForm();
    this.submitForm();
  }
}