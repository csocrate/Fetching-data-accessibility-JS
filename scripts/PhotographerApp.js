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
      .map(media => new PhotographerFactory(media, 'media'));

    this.displayMediaPortFolioData();
    
    // Medias sort
    new OrderBy(this.mediaData);
      
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
}
const photographerApp = new PhotographerApp();
photographerApp.init();