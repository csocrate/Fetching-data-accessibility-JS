class Likes {
  constructor() {
    this._counter = 0;
  }

  handleLike(action) {
    if (action === 'LIKE') {
      this._counter = 1;
    } else if (action === 'DISLIKE') {
      this._counter += -1;
    }
    return this._counter;
  }
}