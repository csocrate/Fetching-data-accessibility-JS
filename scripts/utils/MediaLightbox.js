class MediaLightbox extends Modal {
  constructor(body, modal, launchingTarget, closingTarget, media) {

    super(body, modal, launchingTarget, closingTarget)

    this._media = media
  }

  get media() {
    return this._media
  }

  createMediaLightbox() {
    const div = document.createElement('div')
    div.classList.add('slide')

    const p = document.createElement('p')
    p.textContent = this._media.title

    div.innerHTML = this._media.format
    div.appendChild(p)

    return (div)
  }

  init() {    
    this.getModal()
  }
}