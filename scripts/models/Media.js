/**
 * ------------------------------------------------------------
 * Fisheye models/Media.js
 * ------------------------------------------------------------
 */

class Media {
  /**
   * To create getters of media properties
   * @param {Object} data - list of objects from .json file
   */
  constructor(data) {
    this._id = data.id
    this._photographerId = data.photographerId
    this._title = data.title
    this._image = data.image
    this._video = data.video
    this._likes = data.likes
    this._date = data.date
    this._price = data.price
  }

  // Gets media id
  get id() {
    return this._id
  }

  // Gets photographer id of the media
  get photographerId() {
    return this._photographerId
  }

  // Gets media title
  get title() {
    return this._title
  }

  // Gets media image and media title or media video with HTML markup
  get formatDom() {
    const imgDom = `<img src="assets/medias/${this._image}" class="img_media" alt="${this._title}">`;
    const videoDom = `
      <video class="video_media">
        <source src="assets/medias/${this._video}" type="video/mp4">
        <p>Votre navigateur ne prend pas en charge les vidéos HTML5</p>
      </video>`;

    return this._image ? imgDom : videoDom;
  }

  // Gets media image or media video with path
  get format() {
    return this._image ? `assets/medias/${this._image}` : `assets/medias/${this._video}`
  }

  // Gets media likes
  get likes() {
    return this._likes
  }

  // Gets media date
  get date() {
    return this._date
  }

  // Gets media price
  get price() {
    return this._price
  }
}