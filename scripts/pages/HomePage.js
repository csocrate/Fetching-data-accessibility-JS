/**
 * ------------------------------------------------------------
 * Fisheye pages/HomePage.js
 * ------------------------------------------------------------
 */

 class HomePage {
  constructor() {
    this.$photographerSection = document.querySelector(".photographer_section")
  }

  /**
   * Allows to display photographer card template
   * With data
   * @param {HTMLElement} - photographerCard
   */
  async displayData(photographerCard) {
    this.$photographerSection.appendChild(photographerCard);
  }
}