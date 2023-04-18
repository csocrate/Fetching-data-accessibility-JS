class App {
  constructor() {
    this.dataApi = new DataApi("/data/photographers.json")
    this.homePage = new HomePage()
  }

  /**
   * 
   * @returns {Object | Array}
   */
  async getPhotographers() {
    const photographersData = await this.dataApi.photographersFetch()
    console.log(photographersData)
    return photographersData
  }
  
  async init() {
    const photographers = await this.getPhotographers();
    this.homePage.displayData(photographers);
  }
}
const app = new App()
app.init()