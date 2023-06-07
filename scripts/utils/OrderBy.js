/**
 * ------------------------------------------------------------
 * Fisheye utils/OrderBy.js
 * ------------------------------------------------------------
 */

class OrderBy {
  /**
   * @param {Object} medias - list of objects from .json file
   */
  constructor(medias) {
    this._medias          = medias;
    
    this.$select          = document.querySelector('.select-native');    
    this.$options         = Array.from(document.getElementsByTagName('option'));
    
    this.selectBoxes      = new SelectBoxes();
    this.photographerPage = new PhotographerPage();

    this.init();
  }

  get media() {
    return this._medias;
  }

  /**
   * When click on one of the custom options: 
   * Native select will have same selected option as the custom
   */
  updateSelectedOption() {
    const selectedCustomOption = document.querySelector('.selected_custom-option');

    this.$options
      .forEach(option => {
        if (option.selected && option.hasAttribute('selected')) {
          option.removeAttribute('selected')
        }
    });

    this.$options
      .filter(option => option.textContent === selectedCustomOption.textContent)
      .map(selectedOption => selectedOption.toggleAttribute('selected'));
  }

  /**
   * When click on one of the custom options: 
   * Custom select will have a selected option updated
   */
  updateselectedCustomOption(e) {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const arrow                = this.selectBoxes.createArrowIcon();
    const customOptions        = Array
      .from(document.querySelectorAll('.custom-options div'));

    selectedCustomOption.innerHTML = e.target.innerHTML;
    selectedCustomOption.appendChild(arrow);  

    customOptions
      .filter(customOption => customOption.className === 'selected-hidden')         
      .map(customOption => customOption.removeAttribute('class'));

    e.target.className = 'selected-hidden';
  }

  /**
   * Shows or hide custom options list
   */
  isCustomOptionsListVisible() {
    const customSelect = document.querySelector('.select-custom');

    if (customSelect.className !== 'select-custom') {
      customSelect.classList.remove('overflow');
    } else {
      customSelect.classList.toggle('overflow');
    }
  }

  handleMediasSort() {
    this.selectedOptionByDefault();
    this.observeSelectedOptionChange();
  }

  /**
   * Inits medias displaying
   * By the default selected option
   */
  selectedOptionByDefault() {
        
    this.resetMediasDisplay();
    
    if (this.$select.selectedIndex === 0) {      

      this._medias
        .sort((a,b) => b.likes - a.likes);
    }
    
    this.displayMediaPortFolioData();
  }

  /**
   * Uses MutationObserver to watch for changes
   * Being made to select box
   * A way then to update medias displaying sorted by selected index
   * @see selectedOptionChange()
   */
  observeSelectedOptionChange() {

    // Describe which DOM mutations should be reported to mutationObserver's callback
    const optionsObserver = {
      subtree: true,
      attributeOldValue: true,
      attributesFilter: ['selected']
    }

    // MutationObserver's callback
    const optionSelected = (mutationList) => {
      mutationList.forEach((mutation) => {
        switch (mutation.type) {
          case 'attributes':
            switch (mutation.attributeName) {
              case 'selected':
                this.selectedOptionChange(mutation.target.selected);
                break;
            }
            break;
        }
      });
    }

    const observer = new MutationObserver(optionSelected)
    observer.observe(this.$select, optionsObserver);
  }

  /**
   * Sorts medias by selected index updated
   * About select box
   */
  selectedOptionChange() {

    this.resetMediasDisplay();

    if (this.$select.selectedIndex === 0) {

      this._medias
        .sort((a,b) => b.likes - a.likes);

    } else if (this.$select.selectedIndex === 1) {

      this._medias
        .sort((a,b) => new Date(b.date) - new Date(a.date));  

    } else if (this.$select.selectedIndex === 2) {

      this._medias
        .sort((a,b) => {
          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        });
    }
    this.displayMediaPortFolioData();
  }

  /**
   * Cleans medias section
   * Before update medias displaying
   */
  resetMediasDisplay() {
    const mediaSection = document.querySelector('.media_section');
    mediaSection.innerHTML = '';
  }

  /**
   * Medias displaying will be updated by sort
   */
  displayMediaPortFolioData() {
    this._medias
      .forEach(media => {
        // Media portfolio
        const portfolio      = new MediaPortfolio(media);
        const mediaPortfolio = portfolio.createMediaPortfolio();
        this.photographerPage.displayMediaData(mediaPortfolio);
      });
  }

  /**
   * When select is used with keyboard, this syncs select box with custom select
   * And keeps custom appareance for users using keyboard with ou without assistive technologies
   * @param {HTMLElement} option - option element
   */
  syncSelectWithCustomSelect(option) {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const arrow                = this.selectBoxes.createArrowIcon();
    const customOptions        = Array
      .from(document.querySelectorAll('.custom-options div'));

    selectedCustomOption.textContent = option.textContent;
    selectedCustomOption.appendChild(arrow);

    customOptions
      .forEach(customOption => {

        if( customOption.hasAttribute('class')) {
          customOption.removeAttribute('class');
        }

        customOption.innerHTML = '';
      });

    this.selectBoxes.setCustomOptions();
  }

  /**
   * @typedef {object} KeyboardEvent
   */

  /**
   * With keyboard allows navigate or select with Arrow keys,
   * display or select with Enter and cancel with Escape
   * @see syncSelectWithCustomSelect(option)
   * @param {KeyboardEvent} e 
   * @returns - Do nothing if the event was already processed
   */
  useSelectWithKeyboard(e) {
    
    const customSelect   = document.querySelector('.select-custom');

    const firstOption    = this.$select[0];
    const lastOption     = this.$select[this.$select.length -1];
    const selectedIndex  = this.$select.selectedIndex;
    const selectedOption = this.$select[this.$select.selectedIndex];

    const downOption = selectedIndex === lastOption ? firstOption : this.$select[selectedIndex + 1];

    const upOption   = selectedIndex === 0 ? lastOption : this.$select[selectedIndex - 1];

    if (e.key === 'ArrowDown') {

      if (lastOption.hasAttribute('selected')) {

        this.$options
          .find(option => option === lastOption)
          .removeAttribute('selected');
  
        this.$options
          .find(option => option === firstOption)
          .setAttribute('selected', '');

        this.syncSelectWithCustomSelect(firstOption);

      } else {
        this.$options
          .find(option => option === selectedOption)
          .removeAttribute('selected');
  
        this.$options
          .find(option => option === downOption)
          .setAttribute('selected', '');

        this.syncSelectWithCustomSelect(downOption);
      }

      e.preventDefault();

    } else if (e.key === 'ArrowUp') {

      if (firstOption.hasAttribute('selected')) {

        this.$options
          .find(option => option === firstOption)
          .removeAttribute('selected');
  
        this.$options
          .find(option => option === lastOption)
          .setAttribute('selected', '');

        this.syncSelectWithCustomSelect(lastOption);

      } else {
        this.$options
          .find(option => option === selectedOption).removeAttribute('selected');
  
        this.$options
          .find(option => option === upOption).setAttribute('selected', '');

        this.syncSelectWithCustomSelect(upOption);
      }

      e.preventDefault();

    } else if (e.key === 'Enter') {
      // Shows custom options list 
      this.isCustomOptionsListVisible();

      e.preventDefault(); // prevent select action  on Enter key
      e.stopPropagation(); // stop prevent select action  on Enter key

    } else if (e.key === 'Tab') {
        // Hides custom options list
        customSelect.classList.remove('overflow');
    }
  }

  init() {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const customOptions        = Array.from(document.querySelectorAll('.custom-options div'));

    selectedCustomOption.addEventListener('click', () => {
      this.isCustomOptionsListVisible();
    });

    customOptions
      .forEach( customOption => customOption.addEventListener('click', (e) => {
        this.updateselectedCustomOption(e);
        this.updateSelectedOption();
        this.isCustomOptionsListVisible();
    }));

    this.handleMediasSort();

    this.$select.addEventListener('keydown', e => {
      this.useSelectWithKeyboard(e);
    });
  }
}