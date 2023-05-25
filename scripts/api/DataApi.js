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
    if (!this.data) {
      await this.get();
    }
    return this.data.photographers;
  }

  async mediaFetch() {
    if (!this.data) {
      await this.get();
    }
    return this.data.media;
  }
}