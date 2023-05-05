class IndexApp {
  constructor() {
    this.dataApi  = new DataApi("/data/photographers.json")
    this.homePage = new HomePage()
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch()

    photographersData
      .map(photographer => new PhotographerFactory(photographer, "photographers"))
      .forEach(photographer => {
        const photographerCard  = new PhotographerCard(photographer)
        const photographerModel = photographerCard.createPhotographerCard();

        this.homePage.displayData(photographerModel)
      })
  }
}
const indexApp = new IndexApp()
indexApp.init()