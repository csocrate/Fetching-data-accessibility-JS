/**
 * ------------------------------------------------------------
 * Fisheye templates/PhotographerBanner.js
 * ------------------------------------------------------------
 */

 class PhotographerBanner {
   /**
    * @param {Object} photographer - list of objects from .json file
    */
  constructor(photographer) {
    this._photographer = photographer
  }

  get photographer() {
    return this._photographer
  }

  /**
   * Returns photographer banner template
   * @returns {HTMLElement} - banner
   */
  createPhotographerBanner() {

    const description = document.createElement('div')
    description.classList.add('description')

    const h1 = document.createElement('h1')
    h1.textContent = this._photographer.name

    const h2 = document.createElement( 'h2' );
    h2.classList.add('photographer-location')
    h2.textContent = `${this._photographer.city}, ${this._photographer.country}`;

    const p = document.createElement( 'p' )
    p.textContent = this._photographer.tagline

    const contactButton = document.querySelector('.contact_button')

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    
    const img = document.createElement( 'img' );
    img.setAttribute('src', this._photographer.portrait);
    img.setAttribute('alt', this._photographer.name);


    const banner = document.createElement('div')
    banner.classList.add('banner')

    description.appendChild(h1)
    description.appendChild(h2)
    description.appendChild(p)
    imgContainer.appendChild(img)
    banner.appendChild(description)
    banner.appendChild(contactButton)
    banner.appendChild(imgContainer)

    return (banner)
  }
}