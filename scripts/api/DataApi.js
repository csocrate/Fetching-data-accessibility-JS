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
  photographersFetch() {
    return this.get()
      .then(data => {
        const photographers = data.photographers
        return photographers
      })
  }

  mediaFetch() {
    return this.get()
      .then(data => {
        const media = data.media
        return media
      })
  }
}