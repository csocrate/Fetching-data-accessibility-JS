class HomePage {
  constructor() {
    this.$photographerSection = document.querySelector(".photographer_section")
  }

  async displayData(photographerCard) {
    this.$photographerSection.appendChild(photographerCard);
  }
}