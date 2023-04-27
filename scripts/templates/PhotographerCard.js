class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  get photographer() {
    return this._photographer
  }

  createPhotographerCard() {

    //Gets photographer query by id
    const params = new URLSearchParams({
      id: this._photographer.id
    })
    params.get("id", this._photographer.id)
    const photographerId = params.toString()

    const a = document.createElement('a');
    a.setAttribute('href', `/photographer.html?${photographerId}`);
    a.setAttribute('aria-label', this._photographer.name);

    const article = document.createElement( 'article' );

    const div = document.createElement('div');
    div.classList.add('img-container');
    
    const img = document.createElement( 'img' );
    img.setAttribute('src', this._photographer.portrait);
    img.setAttribute('alt', '');

    const h2 = document.createElement( 'h2' );
    h2.textContent = this._photographer.name;

    const h3 = document.createElement( 'h3' );
    h3.textContent = `${this._photographer.city}, ${this._photographer.country}`;

    const p = document.createElement( 'p' );
    p.textContent = this._photographer.tagline;

    const span = document.createElement( 'span' );
    span.textContent = `${this._photographer.price}€/jour`;

    div.appendChild(img);
    a.appendChild(div);
    a.appendChild(h2);

    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return (article);
  }
}