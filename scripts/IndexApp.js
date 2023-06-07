/**
 * ------------------------------------------------------------
 * Fisheye IndexApp.js
 * ------------------------------------------------------------
 */

 class IndexApp {
  constructor() {
    this.dataApi  = new DataApi("/data/photographers.json");
    this.homePage = new HomePage();
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch();

    photographersData
      .map(photographer => new PhotographerFactory(photographer, "photographers"))
      .forEach(photographer => {
        const card             = new PhotographerCard(photographer);
        const photographerCard = card.createPhotographerCard();

        // Displays photographer card with data on homepage
        this.homePage.displayData(photographerCard);
      })
  }
}
const indexApp = new IndexApp();
indexApp.init();