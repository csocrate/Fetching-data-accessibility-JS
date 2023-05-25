class Api {
  data =undefined;
  
  /**
   * 
   * @param {string} url
   */
  constructor(url) {
    this._url = url
  }

  /**
   * 
   * @returns {object} Promise
   */
  async get() {
    return fetch(this._url)
      .then(response => {
        // Throws an error if the request fails
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => this.data = data)
  }
}