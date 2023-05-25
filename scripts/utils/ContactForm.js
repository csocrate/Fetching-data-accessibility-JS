class ContactForm extends Modal {
  constructor(body, modal, launchingTarget, closingTarget, photographer) {

    super(body, modal, launchingTarget, closingTarget);

    this._photographer  = photographer;

    this.$form = document.querySelector('form');
  }

  get photographer() {
    return this._photographer;
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
      <label for=''>
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
    }
  }
  
  submitForm() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.isInputNotEmpty();
    })
  }

  init() {
    this.createContactForm();
    this.submitForm();
  }
}