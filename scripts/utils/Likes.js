class Likes {
  constructor() {
    this._counter     = 0;
    this.$countersDom = document.querySelectorAll('.media .counter');
    this.$likeIcons   = document.querySelectorAll('.media[data-id] .fa-heart');
    
    this.onKeyEnterLikeIcon();
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
    // Gets origin total likes
    const totalCounterDom       = document.querySelector('.photograph-widget .counter');
    const arrayCounters         = Array
                                    .from(this.$countersDom, el => el.textContent)
                                    .map(el => parseInt(el, 10));
    
    totalCounterDom.textContent = arrayCounters.reduce((a, b) => a + b, 0);
      
    // Returns media likes and total media likes on repectives DOM counters
    this.$likeIcons
      .forEach(likeIcon => {

        const counterDom = likeIcon.previousSibling;

        likeIcon.addEventListener('click', e => {
          e.preventDefault();

          const currentLike         = parseInt(counterDom.textContent);
          const currentTotalCounter = parseInt(totalCounterDom.textContent);
          const mediaLikes          = counterDom.textContent;
          const totalMediaLikes     = totalCounterDom.textContent;
          const result              = {
            mediaLikes,
            totalMediaLikes
          }
          
          const liked = likeIcon.toggleAttribute('data-liked');
    
          if (!liked) {                             
            counterDom.textContent      = currentLike + this.counter('DISLIKE');
            totalCounterDom.textContent = currentTotalCounter + this.counter('DISLIKE');
            return result
          } else {              
            counterDom.textContent      = currentLike + this.counter('LIKE');
            totalCounterDom.textContent = currentTotalCounter + this.counter('LIKE');
            return result
          }
        })
    });
  }

  onKeyEnterLikeIcon() {
    this.$likeIcons
      .forEach(likeIcon => {
        likeIcon.addEventListener('keyup', e => {
          if (e.key === 'Enter') {
            likeIcon.click();
          }
        });
      })
  }
}