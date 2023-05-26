class OrderBy {

  constructor() {
    this.$options     = Array.from(document.getElementsByTagName('option'));
    this.selectBoxes  = new SelectBoxes();
    this.selectBoxes;

    this.init();
  }

  updateSelectedOptions() {
    const customSelectedOption = document.querySelector('.selected-option');

    this.$options
      .forEach(option => {
        if (option.selected) {
          option.removeAttribute('selected')
        }
    });

    this.$options
      .filter(option => option.textContent === customSelectedOption.textContent)
      .map(selectedOption => selectedOption.toggleAttribute('selected'));
  }

  updateCustomSelectedOptions(e) {
    const customSelectedOption = document.querySelector('.selected-option');
    const arrow                = this.selectBoxes.createArrowIcon();
    const customOptions        = Array
      .from(document.querySelectorAll('.select-template div'));

    customSelectedOption.innerHTML = e.target.innerHTML;    
    customSelectedOption.appendChild(arrow);  

    customOptions
      .filter(el => el.className === 'selected-hidden')         
      .map(el => el.removeAttribute('class'));

    e.target.className = 'selected-hidden';
  }

  isDropdownVisible() {
    const customSelectContainer = document.querySelector('.templates');

    if (customSelectContainer.className !== 'templates') {
      customSelectContainer.classList.remove('overflow');
    } else {
      customSelectContainer.classList.toggle('overflow');
    }
  }

  init() {
    const customSelectedOption = document.querySelector('.selected-option');
    const customOptions        = document.querySelectorAll('.select-template div');

    customSelectedOption.addEventListener('click', () => {
      this.isDropdownVisible();
    });

    customOptions
      .forEach( customOption => customOption.addEventListener('click', (e) => {
        this.updateCustomSelectedOptions(e);
        this.updateSelectedOptions();
        this.isDropdownVisible();
    }));
  }
}