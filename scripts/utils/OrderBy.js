class OrderBy {

  constructor(medias) {
    this._medias          = medias;

    this.$select          = document.querySelector('.select-original');    
    this.$options         = Array.from(document.getElementsByTagName('option'));
    
    this.selectBoxes      = new SelectBoxes();
    this.photographerPage = new PhotographerPage();

    this.init();
  }

  get media() {
    return this._medias;
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
          case "attributes":
            switch (mutation.attributeName) {
              case 'selected':
                this.selectedOptionChange(mutation.target.selected);
                // console.log(mutation.target.selected)
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

    this.handleMediasSort();
  }
}