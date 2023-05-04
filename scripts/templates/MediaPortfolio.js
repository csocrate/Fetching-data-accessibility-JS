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

    const div = document.createElement('div')

    const h3 = document.createElement('h3')
    h3.textContent = this._media.title
    
    const likes = document.createElement('div')
    
    const span = document.createElement('span')
    span.classList.add('counter')
    span.textContent = this._media.likes
    
    const icon = document.createElement('i')
    icon.classList.add('fa','fa-heart')

    const a    = document.createElement('a')
    a.setAttribute('aria-label', `${this._media.title}, vue rapprochée`)
    a.innerHTML = this._media.format

    likes.appendChild(span)
    likes.appendChild(icon)
    div.appendChild(h3)
    div.appendChild(likes)  

    mediaContent.appendChild(a)
    mediaContent.appendChild(div)

    return (mediaContent)
  }
}