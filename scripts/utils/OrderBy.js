class OrderBy {

  constructor() {
    this.$select  = document.querySelector('.select-orderby');
    this.$options = Array.from(document.getElementsByTagName('option'));
  }

  createSelectedOption() {

    const selectDiv = document.createElement('div');
    selectDiv.classList.add('selected-option');

    const arrow = document.createElement('div');
    arrow.classList.add('select-arrow');

    const arrowLeft = document.createElement('span');
    const arrowRight = document.createElement('span');
    
    arrow.appendChild(arrowLeft);
    arrow.appendChild(arrowRight);
    selectDiv.appendChild(arrow);
    document.querySelector('.filter-bar > div').appendChild(selectDiv);
  }

  setSelectedOption() {
    const selectedOption = document.querySelector('.selected-option');

    const index = this.$select.selectedIndex;
    selectedOption.innerHTML = this.$select.options[index].textContent;
  }

  createOptionTemplates() {
    const template = document.createElement('div');
    template.classList.add('select-template');

    const optionsLength = this.$options.length;

    for (let i = 0; i < optionsLength; i++) {
      const option = document.createElement('div');
      template.appendChild(option)
    }

    document.querySelector('.filter-bar > div').appendChild(template);
  }

  setOptionTemplates() {
    const optionTemplates = document.querySelectorAll('.select-template div');

    optionTemplates.forEach( (optionTemplate, index) => {
      if (this.$options.length >= index ) {
        optionTemplate.innerHTML = this.$options[index].textContent;
      }
    })
  }

  init() {
    this.createSelectedOption();
    this.createOptionTemplates();
    this.setOptionTemplates();

    this.$select.addEventListener('click', e => {
      this.setSelectedOption();
      // this.$select.nextElementSibling.classList.toggle('up');
    })
  }
}