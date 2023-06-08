/**
 * ------------------------------------------------------------
 * Fisheye api/DataApi.js
 * ------------------------------------------------------------
 */

 /**
 * @extends Api
 */
 class DataApi extends Api {
  /**
   * Gets data photographers from the URL
   * Gets data media from the URL
   * @param {string} url - URL to the path from json file
   */
  constructor(url) {
    super(url)
  }

  /**
   * Returns data photographers from the URL
   * @async
   * @returns {Object} this.data.photographers
   */  
  async photographersFetch() {
    if (!this.data) {
      await this.get();
    }
    return this.data.photographers;
  }
  
  /**
   * Returns data media from the URL
   * @async
   * @returns {Object} this.data.media
   */  
  async mediaFetch() {
    if (!this.data) {
      await this.get();
    }
    return this.data.media;
  }
}