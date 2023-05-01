class MediaPortfolio {
  constructor(media) {
    this._media   = media
  }

  get media() {
    return this._media
  }

  createMediaPortfolio() {

    const mediaContent = document.createElement('div')
    mediaContent.classList.add('media')

    const img = document.createElement('img')
    img.setAttribute('src', `assets/medias/${this._media.image}`)
    img.setAttribute('alt', this._media.title)

    const video = document.createElement('video')
    video.setAttribute('controls', '')

    const source = document.createElement('source')
    source.setAttribute('src', `assets/medias/${this._media.video}`)
    source.setAttribute('type', 'video/mp4')

    const h3 = document.createElement('h3')
    h3.textContent = this._media.title

    video.appendChild(source)

    if (this._media.image !== undefined) {
      mediaContent.appendChild(img)
    } else {
      mediaContent.appendChild(video)
    }

    mediaContent.appendChild(h3)

    return (mediaContent)
  }
}