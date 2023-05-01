class PhotographerApp {
  constructor() {
    this.dataApi = new DataApi("/data/photographers.json")
    this.photographerPage = new PhotographerPage()
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch()

    photographersData
      .map(photographer => new PhotographerFactory(photographer, "photographer"))
      .filter(photographer => {

        const params = (new URL(document.location)).searchParams
        const photographerId = params.get("id")        

        if (photographer.id == photographerId) {
          const Banner             = new PhotographerBanner(photographer)
          const photographerBanner = Banner.createPhotographerBanner()
          this.photographerPage.displayData(photographerBanner)
        }
      })
  }
}
const photographerApp = new PhotographerApp()
photographerApp.init()