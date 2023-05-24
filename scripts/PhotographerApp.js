class PhotographerApp {
  constructor() {
    this.dataApi          = new DataApi('/data/photographers.json');
    this.photographerPage = new PhotographerPage();
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch();
    const MediaData         = await this.dataApi.mediaFetch();

    // Sort select
    const orderBy = new OrderBy();
    orderBy.init();

    Promise.all([
      photographersData,
      MediaData
    ]).then((values)=> {

      const params         = (new URL(document.location)).searchParams;
      const photographerId = params.get('id');

      values[0]
        .filter(photographer => photographer.id == photographerId)
        .map(photographer => new PhotographerFactory(photographer, 'photographer'))
        .forEach(photographer => {

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
        });

        const mediaSection = document.querySelector('.media_section');
        console.log(mediaSection.dataset.orderBy === 'popular')

        if (mediaSection.dataset.orderBy === 'popular') {
          values[1]
          .filter(media => media.photographerId == photographerId)
          .map(media => new PhotographerFactory(media, 'media'))
          .sort((a,b) => b._likes - a._likes)
          .forEach(media => {
  
            // Media portfolio
            const portfolio      = new MediaPortfolio(media);
            const mediaPortfolio = portfolio.createMediaPortfolio();
            this.photographerPage.displayMediaData(mediaPortfolio);
          });
        } 
        
        if (mediaSection.dataset.orderBy === 'recent') {
          values[1]
          .filter(media => media.photographerId == photographerId)
          .map(media => new PhotographerFactory(media, 'media'))
          .sort((a,b) => new Date(b._date) - new Date(a._date))
          .forEach(media => {
  
            // Media portfolio
            const portfolio      = new MediaPortfolio(media);
            const mediaPortfolio = portfolio.createMediaPortfolio();
            this.photographerPage.displayMediaData(mediaPortfolio);
          });
        }

        if (mediaSection.dataset.orderBy === 'alphabetical order') {
          values[1]
          .filter(media => media.photographerId == photographerId)
          .map(media => new PhotographerFactory(media, 'media'))
          .sort((a,b) => {
            if (a._title < b._title) {
              return -1;
            }
  
            if (a._title > b._title) {
              return 1;
            }
  
            return 0;
          })
          .forEach(media => {
  
            // Media portfolio
            const portfolio      = new MediaPortfolio(media);
            const mediaPortfolio = portfolio.createMediaPortfolio();
            this.photographerPage.displayMediaData(mediaPortfolio);
          });
        }
        
      const lightboxModal  = new LightboxModal(
        'body', 
        '#lightbox_modal', 
        '.media a',
        '#lightbox_modal svg'
        );
      lightboxModal.init();
      
      // Likes counters
      const likes = new Likes();
      likes.handleCounters();
    })
  }
}
const photographerApp = new PhotographerApp();
photographerApp.init();