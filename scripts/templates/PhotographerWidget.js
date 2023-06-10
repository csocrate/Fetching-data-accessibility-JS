/**
 * ------------------------------------------------------------
 * Fisheye templates/PhotographerWidget.js
 * ------------------------------------------------------------
 */

class PhotographerWidget {
  /**
   * @param {Object} photographer - list of objects from .json file
   */
  constructor(photographer) {
    this._photographer = photographer;
  }

  get photographer() {
    return this._photographer;
  }

  /**
   * Returns photographer widget template
   * @returns {HTMLElement} - div (photographer widget container)
   */
  createPhotographerWidget() {

    const div = document.createElement('div');

    const totalLikes = document.createElement('div');

    const span = document.createElement('span');
    span.classList.add('counter');
    span.textContent = '';

    const icon = document.createElement('span');
    icon.classList.add('fa', 'fa-heart');

    const p = document.createElement('p');
    p.textContent = `${this._photographer.price}€ / jour`;

    totalLikes.appendChild(span);
    totalLikes.appendChild(icon);

    div.appendChild(totalLikes);
    div.appendChild(p);

    return (div);
  }
}