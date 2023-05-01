class PhotographerApp {
  constructor() {
    this.dataApi          = new DataApi("/data/photographers.json")
    this.photographerPage = new PhotographerPage()
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch()
    const MediaData         = await this.dataApi.mediaFetch()

    photographersData
      .map(photographer => new PhotographerFactory(photographer, "photographer"))
      .filter(photographer => {

        const params = (new URL(document.location)).searchParams
        const photographerId = params.get("id")        

        if (photographer.id == photographerId) {
          const Banner             = new PhotographerBanner(photographer)
          const photographerBanner = Banner.createPhotographerBanner()
          this.photographerPage.displayPhotographerData(photographerBanner)
        }
      })

    MediaData
      .map(media => new PhotographerFactory(media, "media"))
      .filter(media => {

        const params = (new URL(document.location)).searchParams
        const photographerId = params.get("id")

        if (media.photographerId == photographerId) {
          const Portfolio = new MediaPortfolio(media)
          const mediaPortfolio  = Portfolio.createMediaPortfolio()
          this.photographerPage.displayMediaData(mediaPortfolio)
        }
      })
  }
}
const photographerApp = new PhotographerApp()
photographerApp.init()