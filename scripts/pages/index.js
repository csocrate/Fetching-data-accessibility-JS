class HomePage {
  constructor() {
    this.$photographerSection = document.querySelector(".photographer_section")
  }

  async displayData(photographers) {
    
    for (let photographer of photographers) {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      this.$photographerSection.appendChild(userCardDOM);
    }
  }
}