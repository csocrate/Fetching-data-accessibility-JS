/**
 * ------------------------------------------------------------
 * Fisheye PhotographerApp.js
 * ------------------------------------------------------------
 */

class PhotographerApp {
  mediaData = undefined;

  constructor() {
    this.dataApi = new DataApi('/data/photographers.json');
    this.photographerPage = new PhotographerPage();
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch();
    const mediaData = await this.dataApi.mediaFetch();

    const params = (new URL(document.location)).searchParams;
    const photographerId = params.get('id');

    let photographer = photographersData
      .find(photographer => photographer.id == photographerId)

    if (photographer) {
      photographer = new PhotographerFactory(photographer, 'photographer');

      // Displays photographer banner with data on photographer page
      const photographerBanner = new PhotographerBanner(photographer);
      const banner = photographerBanner.createPhotographerBanner();
      this.photographerPage.displayPhotographerData(banner);

      // Displays photographer widget with data on photographer page
      const photographerWidget = new PhotographerWidget(photographer);
      const widget = photographerWidget.createPhotographerWidget();
      this.photographerPage.displayPhotograherDataWidget(widget);

      const form = new ContactForm(
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

    // Likes counters
    const likes = new Likes();
    likes.handleCounters();

    // Lightbox modal
    new LightboxModal(
      'body',
      '#lightbox_modal',
      '.media a',
      '#lightbox_modal svg'
    );
  }

  displayMediaPortFolioData() {
    this.mediaData
      .forEach(media => {
        // Displays photographer's medias with data on photographer page
        const mediaPortfolio = new MediaPortfolio(media);
        const portfolio = mediaPortfolio.createMediaPortfolio();
        this.photographerPage.displayMediaData(portfolio);
      });
  }
}
const photographerApp = new PhotographerApp();
photographerApp.init();