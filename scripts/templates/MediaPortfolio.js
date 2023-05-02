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

    const div = document.createElement('div')

    const h3 = document.createElement('h3')
    h3.textContent = this._media.title
    
    const likes = document.createElement('div')
    
    const span = document.createElement('span')
    span.classList.add('counter')
    span.textContent = this._media.likes
    
    const icon = document.createElement('i')
    icon.classList.add('fa','fa-heart')

    const likesWidget = document.createElement('div')

    video.appendChild(source)
    likes.appendChild(span)
    likes.appendChild(icon)
    div.appendChild(h3)
    div.appendChild(likes)

    if (this._media.image !== undefined) {
      mediaContent.appendChild(img)
    } else {
      mediaContent.appendChild(video)
    }

    mediaContent.appendChild(div)

    return (mediaContent)
  }
}