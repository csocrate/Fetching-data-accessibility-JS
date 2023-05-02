class PhotographerWidget {
  constructor(photographer, media) {
    this._photographer = photographer
    this._media = media
  }

  get photographer() {
    return this._photographer
  }

  get media() {
    return this._media
  }


  createPhotographerWidget() {

    const div = document.createElement('div')
    
    const totalLikes  = document.createElement('div')

    const span = document.createElement('span')
    span.classList.add('counter')
    span.textContent = '297 081'
    
    const icon = document.createElement('i')
    icon.classList.add('fa','fa-heart')

    const p = document.createElement('p')
    p.textContent = `${this._photographer.price}€ / jour`

    totalLikes.appendChild(span)
    totalLikes.appendChild(icon)

    div.appendChild(totalLikes)
    div.appendChild(p)

    return (div)
  }
}