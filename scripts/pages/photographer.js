class PhotographerPage {
  constructor() {
    this.$photographHeader = document.querySelector(".photograph-header")
    this.$mediaSection     = document.querySelector(".media_section")
    this.$photographWidget = document.querySelector(".photograph-widget")
    this.$modalTitle       = document.querySelector(".modal h2")
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

  async displayPhotograherDataModal(photographerModal) {
    this.$modalTitle.after(photographerModal)
  }
}