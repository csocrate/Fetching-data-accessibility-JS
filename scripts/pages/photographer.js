class PhotographerPage {
  constructor() {
    this.$photographHeader = document.querySelector(".photograph-header")
    this.$mediaSection     = document.querySelector(".media_section")
    this.$photographWidget = document.querySelector(".photograph-widget")
    this.$mediaSlideshow   = document.querySelector(".media_slideshow")
  }

  async displayPhotographerData(photographerBanner) {
    this.$photographHeader.appendChild(photographerBanner)
  }

  async displayMediaData(photographerMedia) {
    this.$mediaSection.appendChild(photographerMedia)
  }

  async displayPhotograherDataWidget(photographerMedia) {
    this.$photographWidget.appendChild(photographerMedia)
  }

  async displayMediaDataSlideshow(mediaCarousel) {
    this.$mediaSlideshow.appendChild(mediaCarousel)
  }
}