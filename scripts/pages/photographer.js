class PhotographerPage {
  constructor() {
    this.$photographHeader = document.querySelector(".photograph-header")
    this.$mediaSection     = document.querySelector(".media_section")
    this.$photographWidget = document.querySelector(".photograph-widget")
  }

  async displayPhotographerData(photographerBanner) {
    this.$photographHeader.appendChild(photographerBanner)
  }

  async displayMediaData(photographerMedia) {
    this.$mediaSection.appendChild(photographerMedia)
  }

  async displayPhotograhWidget(photographerMedia) {
    this.$photographWidget.appendChild(photographerMedia)
  }
}