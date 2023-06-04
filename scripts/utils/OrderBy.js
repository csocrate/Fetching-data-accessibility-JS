class OrderBy {

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

  updateSelectedOptions() {
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

  updateselectedCustomOptions(e) {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const arrow                = this.selectBoxes.createArrowIcon();
    const customOptions        = Array
      .from(document.querySelectorAll('.custom-options div'));

    selectedCustomOption.innerHTML = e.target.innerHTML;
    selectedCustomOption.appendChild(arrow);  

    customOptions
      .filter(el => el.className === 'selected-hidden')         
      .map(el => el.removeAttribute('class'));

    e.target.className = 'selected-hidden';
  }

  isDropdownVisible() {
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

  selectedOptionByDefault() {
        
    this.resetMediasDisplay();
    
    if (this.$select.selectedIndex === 0) {      

      this._medias
        .sort((a,b) => b.likes - a.likes);
    }
    
    this.displayMediaPortFolioData();
  }

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

  resetMediasDisplay() {
    const mediaSection = document.querySelector('.media_section');
    mediaSection.innerHTML = '';
  }

  displayMediaPortFolioData() {
    this._medias
      .forEach(media => {
        // Media portfolio
        const portfolio      = new MediaPortfolio(media);
        const mediaPortfolio = portfolio.createMediaPortfolio();
        this.photographerPage.displayMediaData(mediaPortfolio);
      });
  }

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

  useSelectWithKeyboard(e) {
    if (e.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    const firstOption          = this.$select[0];
    const lastOption           = this.$select[this.$select.length -1];
    const selectedIndex        = this.$select.selectedIndex;
    const selectedOption       = this.$select[this.$select.selectedIndex];

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
    } else if (e.key === 'Enter') {
      this.isDropdownVisible();
    } else if (e.key === 'Escape') {
      this.$select.blur();
      this.isDropdownVisible();
    }

    e.preventDefault();
  }

  init() {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const customOptions        = Array.from(document.querySelectorAll('.custom-options div'));

    selectedCustomOption.addEventListener('click', () => {
      this.isDropdownVisible();
    });

    customOptions
      .forEach( customOption => customOption.addEventListener('click', (e) => {
        this.updateselectedCustomOptions(e);
        this.updateSelectedOptions();
        this.isDropdownVisible();
    }));

    this.handleMediasSort();

    this.$select.addEventListener('keydown', e => {
      this.useSelectWithKeyboard(e);
    },
    true);
  }
}