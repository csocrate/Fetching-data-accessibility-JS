class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  get photographer() {
    return this._photographer
  }

  createPhotographerCard() {
    const article = document.createElement( 'article' );
    
    const img = document.createElement( 'img' );
    img.setAttribute("src", this._photographer.portrait)

    const h2 = document.createElement( 'h2' );
    h2.textContent = this._photographer.name;

    const h3 = document.createElement( 'h3' );
    h3.textContent = `${this._photographer.city}, ${this._photographer.country}`;

    const p = document.createElement( 'p' );
    p.textContent = this._photographer.tagline;

    const span = document.createElement( 'span' );
    span.textContent = `${this._photographer.price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return (article);
  }
}