class OrderBy {

  constructor() {
    this.$select  = document.querySelector('.select-original');
    this.$options = Array.from(document.getElementsByTagName('option'));
  }  

  createArrowIcon() {
    const arrow = document.createElement('div');
    arrow.classList.add('select-arrow');

    const arrowLeft  = document.createElement('span');
    const arrowRight = document.createElement('span');
    
    arrow.appendChild(arrowLeft);
    arrow.appendChild(arrowRight);

    return arrow;
  }

  createSelectedOption() {
    const selectDiv = document.createElement('div');
    selectDiv.classList.add('selected-option');

    const arrow = this.createArrowIcon();
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
    const selectedOptionTemplate = this.createSelectedOption();
    const optionTemplates        = this.createOptionTemplates();
    const templatesContainer     = document.createElement('div');
    templatesContainer.classList.add('templates');

    templatesContainer.appendChild(selectedOptionTemplate);
    templatesContainer.appendChild(optionTemplates);
    document.querySelector('.filter-bar > div').appendChild(templatesContainer);
  }

  setSelectedOption() {
    const selectedOptionTemplate = document.querySelector('.selected-option');

    const index = this.$select.selectedIndex;
    selectedOptionTemplate.innerHTML += this.$select.options[index].textContent;
  }

  setOptionTemplates() {
    const optionTemplates = Array.from(document.querySelectorAll('.select-template div'));

    // Empty array to push all index of optionTemplates array on it
    const indexes = [];

    optionTemplates.forEach( (optionTemplate, index) => {
      if (this.$options.length >= index ) {
        optionTemplate.innerHTML += this.$options[index].textContent;
      }

      indexes.push(index);
    })

    const isSelectedTemplateIndex = (el) => el === this.$select.selectedIndex;

    const selectedTemplateIndex = indexes.findIndex(isSelectedTemplateIndex);
    optionTemplates[selectedTemplateIndex].classList.add('selected-hidden');
  }

  /**
   * 
   * @param {*} e 
   */
  updateSelectedOptions(e) {
    // Selected option - template
    const selectedOptionTemplate = document.querySelector('.selected-option');
    selectedOptionTemplate.innerHTML = e.target.innerHTML;

    const arrow = this.createArrowIcon();
    selectedOptionTemplate.appendChild(arrow);

    const optionTemplates = Array.from(document.querySelectorAll('.select-template div'));
    optionTemplates
      .filter(el => el.className === 'selected-hidden')                   
      .map(el => el.removeAttribute('class'));
    e.target.className = 'selected-hidden';

    // Selected option - original
    const options = Array.from(document.querySelectorAll('option'));
    options.forEach(option => {
      if (option.selected) {
        option.removeAttribute('selected')
      }
    })
    options
      .filter(option => option.textContent === selectedOptionTemplate.textContent)
      .map(selectedOption => selectedOption.toggleAttribute('selected'));
  }

  isSelectTemplateVisible(e) {
    document.querySelector('.templates').classList.toggle('overflow');
  }
  
  sortMedias() {
    const mediaSection = document.querySelector('.media_section');

    if (this.$select.selectedIndex === 0) {
      mediaSection.dataset.orderBy = 'popular';
      console.log(this.$select.selectedIndex)
    } 
    
    if (this.$select.selectedIndex === 1) {
      mediaSection.dataset.orderBy = 'recent';
      console.log(this.$select.selectedIndex)
    } 
    
    if (this.$select.selectedIndex === 2) {
      mediaSection.dataset.orderBy = 'alphabetical order';
      console.log(this.$select.selectedIndex)
    }
  }

  init() {
    this.displayTemplates();
    this.setSelectedOption();
    this.setOptionTemplates();
    this.sortMedias();

    const mediaSection = document.querySelector('.media_section');

    document.querySelector('.selected-option').addEventListener('click', (e) => {
      document.querySelector('.select-arrow').classList.add('up');
    });

    document.querySelectorAll('.select-template div').forEach( optionTemplate => optionTemplate.addEventListener('click', (e) => {
      document.querySelector('.select-arrow').classList.remove('up');
      this.updateSelectedOptions(e);
      this.isSelectTemplateVisible(e);
      this.sortMedias();
      orderBy.init();
    }));
  }
}