class DataApi extends Api {
  /**
   * 
   * @param {string} url
   */
  constructor(url) {
    super(url)
  }

  /**
   * 
   * @returns {Object | Array}
   */
  async photographersFetch() {
    return await this.get()
      .then(data => {
        const photographers = data.photographers
        return photographers
      })
  }
}