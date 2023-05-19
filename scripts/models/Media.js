class Media {
  constructor(data) {
    this._id             = data.id
    this._photographerId = data.photographerId
    this._title          = data.title
    this._image          = data.image
    this._video          = data.video
    this._likes          = data.likes
    this._date           = data.date
    this._price          = data.price
  }

  get id() {
    return this._id
  }

  get photographerId() {
    return this._photographerId
  }

  get title() {
    return this._title
  }

  get formatDom() {
    return this._image ? `<img src="assets/medias/${this._image}" class="img_media" alt="${this._title}">` : `<video controls="" class="video_media"><source src="assets/medias/${this._video}" type="video/mp4"></video>`
  }

  get format() {
    return this._image ? `assets/medias/${this._image}` : `assets/medias/${this._video}`
  }

  get likes() {
    return this._likes
  }

  get date() {
    return this._date
  }

  get price() {
    return this._price
  }
}