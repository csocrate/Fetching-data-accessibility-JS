/**
 * ------------------------------------------------------------
 * Fisheye pages/PhotographerPage.js
 * ------------------------------------------------------------
 */

 class PhotographerPage {
  constructor() {
    this.$photographHeader  = document.querySelector(".photograph-header");
    this.$mediaSection      = document.querySelector(".media_section");
    this.$photographWidget  = document.querySelector(".photograph-widget");
  }

  /**
   * Allows to display photographer banner
   * With data
   * @param {HTMLElement} photographerBanner 
   */
  async displayPhotographerData(photographerBanner) {
    this.$photographHeader.appendChild(photographerBanner);
  }

  /**
   * Allows to display photographer's medias
   * With data
   * @param {HTMLElement} photographerMedias 
   */
  async displayMediaData(photographerMedias) {
    this.$mediaSection.appendChild(photographerMedias);
  }

  /**
   * Allows to display photographer widget
   * With data
   * @param {HTMLElement} photographerWidget 
   */
   async displayPhotograherDataWidget(photographerWidget) {
    this.$photographWidget.appendChild(photographerWidget);
  }
}