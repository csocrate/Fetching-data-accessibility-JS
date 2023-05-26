class SelectBoxes {
  constructor() {
    this.$select      = document.querySelector('.select-original');
    this.$options     = Array.from(document.getElementsByTagName('option'));

    this.init();
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

  createCustomSelectedOption() {
    const customSelectedOption = document.createElement('div');
    customSelectedOption.classList.add('selected-option');

    const arrow = this.createArrowIcon();
    customSelectedOption.appendChild(arrow);

    return customSelectedOption;
  }

  createCustomOptions() {
    const customOptions = document.createElement('div');
    customOptions.classList.add('select-template');

    for (let i = 0; i < this.$options.length; i++) {
      const option = document.createElement('div');
      customOptions.appendChild(option)
    }

    return customOptions;
  }

  displayCustomSelect() {
    const createCustomSelectedOption = this.createCustomSelectedOption();
    const createCustomOptions        = this.createCustomOptions();
    const customSelectContainer      = document.createElement('div');
    customSelectContainer.classList.add('templates');

    customSelectContainer.appendChild(createCustomSelectedOption);
    customSelectContainer.appendChild(createCustomOptions);
    document.querySelector('.filter-bar > div').appendChild(customSelectContainer);
  }

  setCustomSelectedOption() {
    const customSelectedOption = document.querySelector('.selected-option');

    const index = this.$select.selectedIndex;
    customSelectedOption.innerHTML += this.$select.options[index].textContent;
  }

  setCustomOptions() {
    const customOptions = Array.from(document.querySelectorAll('.select-template div'));

    // Empty array to push all index of customOptions array on it
    const indexes = [];

    customOptions.forEach( (optionTemplate, index) => {
      if (this.$options.length >= index ) {
        optionTemplate.innerHTML += this.$options[index].textContent;
      }

      indexes.push(index);
    })

    const originalSelectedIndex = (el) => el === this.$select.selectedIndex;

    const customSelectedIndex = indexes.findIndex(originalSelectedIndex);
    customOptions[customSelectedIndex].classList.add('selected-hidden');
  }

  init() {
    this.displayCustomSelect();
    this.setCustomSelectedOption();
    this.setCustomOptions();
  }
}