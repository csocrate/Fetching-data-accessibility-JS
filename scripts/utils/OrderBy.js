class OrderBy {

  constructor() {
    this.$select  = document.querySelector('.select-original');
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

    return selectDiv;
  }

  createOptionTemplates() {
    const template = document.createElement('div');
    template.classList.add('select-template');

    for (let i = 0; i < this.$options.length; i++) {
      const option = document.createElement('div');
      template.appendChild(option)
    }

    return template;
  }

  displayTemplates() {
    const selectedOption     = this.createSelectedOption();
    const optionTemplates    = this.createOptionTemplates();
    const templatesContainer = document.createElement('div');
    templatesContainer.classList.add('templates');

    templatesContainer.appendChild(selectedOption);
    templatesContainer.appendChild(optionTemplates);
    document.querySelector('.filter-bar > div').appendChild(templatesContainer);
  }

  setSelectedOption() {
    const selectedOption = document.querySelector('.selected-option');

    const index = this.$select.selectedIndex;
    selectedOption.innerHTML = this.$select.options[index].textContent;
  }

  setOptionTemplates() {
    const optionTemplates = Array.from(document.querySelectorAll('.select-template div'));
    console.log(optionTemplates)

    // Empty array to push all index of optionTemplates array on it
    const indexes = [];

    optionTemplates.forEach( (optionTemplate, index) => {
      if (this.$options.length >= index ) {
        optionTemplate.innerHTML = this.$options[index].textContent;
      }

      indexes.push(index);
    })

    const isSelectedTemplateIndex = (el) => el === this.$select.selectedIndex;

    const selectedTemplateIndex = indexes.findIndex(isSelectedTemplateIndex);
    optionTemplates[selectedTemplateIndex].classList.add('selected-hidden');
  }

  init() {
    this.displayTemplates();
    this.setSelectedOption();
    this.setOptionTemplates();

    this.$select.addEventListener('click', e => {
      this.setSelectedOption();
      // this.$select.nextElementSibling.classList.toggle('up');
    })
  }
}