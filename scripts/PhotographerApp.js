class PhotographerApp {
  constructor() {
    this.dataApi          = new DataApi("/data/photographers.json")
    this.photographerPage = new PhotographerPage()
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch()
    const MediaData         = await this.dataApi.mediaFetch()

    const Form = new ContactForm()
    Form.render()

    const Box = new MediaLightbox()
    Box.render()

    photographersData
      .map(photographer => new PhotographerFactory(photographer, "photographer"))
      .filter(photographer => {

        const params = (new URL(document.location)).searchParams
        const photographerId = params.get("id")        

        if (photographer.id == photographerId) {
          const Banner             = new PhotographerBanner(photographer)
          const photographerBanner = Banner.createPhotographerBanner()
          this.photographerPage.displayPhotographerData(photographerBanner)
    
          const Widget             = new PhotographerWidget(photographer)
          const photographerWidget = Widget.createPhotographerWidget()
          this.photographerPage.displayPhotograherDataWidget(photographerWidget)
    
          const Form               = new ContactForm(photographer)
          const photographerName   = Form.createPhotographerName()
          photographerName
        }
      })

    MediaData
      .map(media => new PhotographerFactory(media, "media"))
      .filter(media => {

        const params = (new URL(document.location)).searchParams
        const photographerId = params.get("id")

        if (media.photographerId == photographerId) {
          const Portfolio      = new MediaPortfolio(media)
          const mediaPortfolio = Portfolio.createMediaPortfolio()
          this.photographerPage.displayMediaData(mediaPortfolio)
    
          const Lightbox       = new MediaLightbox(media)
          const mediaLightbox  = Lightbox.createMediaLightbox()
          this.photographerPage.displayMediaDataSlideshow(mediaLightbox)
        }
      })
  }
}
const photographerApp = new PhotographerApp()
photographerApp.init()