class PhotographerPage {
  constructor() {
    this.$photographHeader = document.querySelector(".photograph-header")
  }

  async displayData(photographerBanner) {
    this.$photographHeader.appendChild(photographerBanner)
  }
}