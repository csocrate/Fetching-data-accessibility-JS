class PhotographerApp {
  mediaData = undefined;

  constructor() {
    this.dataApi          = new DataApi('/data/photographers.json');
    this.photographerPage = new PhotographerPage();
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch();
    const mediaData         = await this.dataApi.mediaFetch();

    const params         = (new URL(document.location)).searchParams;
    const photographerId = params.get('id');

    let photographer = photographersData.find(photographer => photographer.id == photographerId)

    if (photographer) {
      photographer             = new PhotographerFactory(photographer, 'photographer');

      const banner             = new PhotographerBanner(photographer);
      const photographerBanner = banner.createPhotographerBanner();
      this.photographerPage.displayPhotographerData(photographerBanner);

      const widget             = new PhotographerWidget(photographer);
      const photographerWidget = widget.createPhotographerWidget();
      this.photographerPage.displayPhotograherDataWidget(photographerWidget);
  
      const form               = new ContactForm(
        'body', 
        '#contact_modal', 
        '.photograph-header .contact_button', 
        '.close_modal',
        photographer
        );       
      form.init();
      form.createPhotographerName();
    }      

    this.mediaData = mediaData
      .filter(media => media.photographerId == photographerId)
      .map(media => new PhotographerFactory(media, 'media'))

    this.displayMediaPortFolioData();

    new OrderBy();
    this.handleSortMedias();
      
    const lightboxModal  = new LightboxModal(
      'body', 
      '#lightbox_modal', 
      '.media a',
      '#lightbox_modal svg'
      );
    
    // Likes counters
    const likes = new Likes();
    likes.handleCounters();
  }

  displayMediaPortFolioData() {
    this.mediaData
      .forEach(media => {
        // Media portfolio
        const portfolio      = new MediaPortfolio(media);
        const mediaPortfolio = portfolio.createMediaPortfolio();
        this.photographerPage.displayMediaData(mediaPortfolio);
      });
  }

  observeSelectedOptionChange() {
    const orderBySelect = document.querySelector('.select-original');

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
                console.log(mutation.target.selected)
                break;
            }
            break;
        }
      });
    }

    const observer = new MutationObserver(optionSelected)
    observer.observe(orderBySelect, optionsObserver);
  }

  handleSortMedias() {
    this.selectedOptionByDefault();
    this.observeSelectedOptionChange();
  }

  selectedOptionByDefault() {
    const orderBySelect = document.querySelector('.select-original');

    const mediaSection = document.querySelector('.media_section');
    mediaSection.innerHTML = '';

    if (orderBySelect.selectedIndex === 0) {

      this.mediaData
        .sort((a,b) => b._likes - a._likes);
    }
    this.displayMediaPortFolioData();
  }

  selectedOptionChange() {
    const orderBySelect = document.querySelector('.select-original');

    const mediaSection = document.querySelector('.media_section');
    mediaSection.innerHTML = '';

    if (orderBySelect.selectedIndex === 0) {

      this.mediaData
        .sort((a,b) => b._likes - a._likes);

    } else if (orderBySelect.selectedIndex === 1) {

      this.mediaData
        .sort((a,b) => new Date(b._date) - new Date(a._date));  

    } else if (orderBySelect.selectedIndex === 2) {

      this.mediaData
        .sort((a,b) => {
          if (a._title < b._title) {
            return -1;
          }

          if (a._title > b._title) {
            return 1;
          }

          return 0;
        });
    }
    this.displayMediaPortFolioData();
  }
}
const photographerApp = new PhotographerApp();
photographerApp.init();