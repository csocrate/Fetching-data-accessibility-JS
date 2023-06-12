/**
 * ------------------------------------------------------------
 * Fisheye templates/MediaPortfolio.js
 * ------------------------------------------------------------
 */

class MediaPortfolio {
  /**
  * @param {Object} medias - list of objects from .json file
   */
  constructor(media) {
    this._media = media;
  }

  get media() {
    return this._media;
  }

  /**
   * Returns Media card template
   * @returns {HTMLElement} - mediaContent
   */
  createMediaPortfolio() {

    const mediaContent = document.createElement('div');
    mediaContent.classList.add('media');
    mediaContent.dataset.id = this._media.id;

    const figure = document.createElement('figure');

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = this._media.title;

    const likes = document.createElement('div');

    const span = document.createElement('span');
    span.classList.add('counter');
    span.textContent = this._media.likes;

    const icon = document.createElement('span');
    icon.classList.add('fa', 'fa-heart');
    icon.setAttribute('tabindex', '0');

    const a = document.createElement('a');
    a.setAttribute('aria-label', `${this._media.title}, vue rapprochée`);
    a.innerHTML = this._media.formatDom;
    a.href = this._media.format;

    figure.appendChild(a);
    figure.appendChild(figcaption);
    likes.appendChild(span);
    likes.appendChild(icon);

    mediaContent.appendChild(figure);
    mediaContent.appendChild(likes);

    return (mediaContent);
  }
}