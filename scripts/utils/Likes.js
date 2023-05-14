class Likes {
  constructor() {
    this._counter = 0;
  }

  counter(action) {
    if (action === 'LIKE') {
      this._counter = 1;
    } else if (action === 'DISLIKE') {
      this._counter = -1;
    }
    return this._counter;
  }

  handleCounters() {
    const countersDom           = document.querySelectorAll('.media .counter');
    const totalCounterDom       = document.querySelector('.photograph-widget .counter');
    const likeIcons             = document.querySelectorAll('.media[data-id] .fa-heart');

    // Gets origin total likes
    const arrayCounters         = Array
                                    .from(countersDom, el => el.textContent)
                                    .map(el => parseInt(el, 10));
    
    totalCounterDom.textContent = arrayCounters.reduce((a, b) => a + b, 0);
      
    // Returns media likes and total media likes on repectives DOM counters
    likeIcons.forEach(likeIcon => {

      const counterDom = likeIcon.previousSibling;

      likeIcon.addEventListener('click', e => {
        e.preventDefault();

        const likes               = new Likes();
        const currentLike         = parseInt(counterDom.textContent);
        const currentTotalCounter = parseInt(totalCounterDom.textContent);
        
        likeIcon.classList.toggle('liked');
  
        if (!likeIcon.classList.contains('liked')) {                             
          counterDom.textContent      = currentLike + this.counter('DISLIKE');
          totalCounterDom.textContent = currentTotalCounter + this.counter('DISLIKE');
          const mediaLikes            = counterDom.textContent;
          const totalMediaLikes       = totalCounterDom.textContent;
          return {
            mediaLikes,
            totalMediaLikes
          }
        } else {              
          counterDom.textContent      = currentLike + this.counter('LIKE');
          totalCounterDom.textContent = currentTotalCounter + this.counter('LIKE');
          const mediaLikes            = counterDom.textContent;
          const totalMediaLikes       = totalCounterDom.textContent;
          return {
            mediaLikes,
            totalMediaLikes
          }
        }
      })
    })
  }
}