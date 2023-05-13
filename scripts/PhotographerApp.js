class PhotographerApp {
  constructor() {
    this.dataApi          = new DataApi('/data/photographers.json');
    this.photographerPage = new PhotographerPage();
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch();
    const MediaData         = await this.dataApi.mediaFetch();

    Promise.all([
      photographersData,
      MediaData
    ]).then((values)=> {

      const params         = (new URL(document.location)).searchParams;
      const photographerId = params.get('id');

      values[0]
        .map(photographer => new PhotographerFactory(photographer, 'photographer'))
        .filter(photographer => photographer.id == photographerId)
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
        })
  
      values[1]
        .map(media => new PhotographerFactory(media, 'media'))
        .filter(media => media.photographerId == photographerId)
        .forEach(media => {

          // Media portfolio
          const portfolio      = new MediaPortfolio(media);
          const mediaPortfolio = portfolio.createMediaPortfolio();
          this.photographerPage.displayMediaData(mediaPortfolio);
    
          // Lightbox
          const lightbox       = new LightboxModal(
            'body', 
            '#lightbox_modal', 
            '.media a', 
            '#lightbox_modal svg',
            media
            );
          const mediaLightbox  = lightbox.createLightboxModal();
          this.photographerPage.displayMediaDataSlideshow(mediaLightbox);
          lightbox.init();
        })

        /**
         * Likes handleness
         */
        const likeIcons = document.querySelectorAll('.media[data-id] .fa-heart');
           
        likeIcons.forEach(likeIcon => {
    
          likeIcon.addEventListener('click', e => {
            e.preventDefault();

            const likes       = new Likes();            
            const counterDom  = likeIcon.previousSibling;
            const currentLike = parseInt(counterDom.textContent);
            
            likeIcon.classList.toggle('liked');
      
            if (!likeIcon.classList.contains('liked')) {                             
              counterDom.textContent = currentLike + likes.handleLike('DISLIKE');
              return counterDom.textContent;
            } else {              
              counterDom.textContent = currentLike + likes.handleLike('LIKE');
              return counterDom.textContent;
            }
          })
        })
    })
  }
}
const photographerApp = new PhotographerApp();
photographerApp.init();