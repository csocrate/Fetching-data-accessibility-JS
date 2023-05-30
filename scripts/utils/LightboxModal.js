class LightboxModal extends Modal {
  constructor(
    body, 
    modal, 
    launchingTarget, 
    closingTarget
    ) {
    super(body, modal, launchingTarget, closingTarget);

    this.$nextBtn           = document.querySelector('.next-btn');
    this.$previousBtn       = document.querySelector('.previous-btn');
    this.$mediaLinks        = Array.from(document.querySelectorAll('.media a'));
    this.$lightboxContainer = document.querySelector(".lightbox");
    
    /**
     * Handle lightbox control buttons
     */
     this.$nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.nextControl();
    });

    this.$previousBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.previousControl();
    });
  }

  getModal() {
    super.getModal();

    this.$launchingTarget
      .forEach(link => link.addEventListener('click', () => {

        this.$body.classList.add('lightbox');

        link.classList.add('active');
        this.createSlide(); 
        this.showSlide();
    }));
  }

  disableMedia() {
    document.querySelector('.media a.active').classList.remove('active');
    this.$lightboxContainer.querySelector('.slide').classList.remove('update');
    this.$lightboxContainer.querySelector('.slide').remove();
  }
  
  createSlide() {
    const slideDom = document.createElement('div');
    slideDom.classList.add('slide');
    
    this.$mediaLinks
      .filter(el => el.querySelector('img'))
      .forEach( el => {
        el.dataset.media = 'image';
      });

    this.$mediaLinks
      .filter(el => el.querySelector('video'))
      .forEach( el => {
        el.dataset.media = 'video';
      });
    
    this.$mediaLinks
      .forEach(link => {
        if (link.classList.contains('active')) {
    
          if (link.getAttribute('data-media') === 'image') {
            slideDom.innerHTML = '<img src"#" class="img_media" alt><p></p>';
          }
      
          if (link.getAttribute('data-media') === 'video') {
            slideDom.innerHTML = '<video controls class="video_media"><source src"#" type="video/mp4"></video><p></p>';
          }
        }
    })
  this.$lightboxContainer.prepend(slideDom);
  }

  showSlide() {

    for (const child of document.querySelector('a.active').childNodes) {
      const newSrc  = document.querySelector('.active').href;
      const caption = document.querySelector('.active ~ figcaption').textContent;

      if (child.tagName === 'IMG') {
        const newAlt  = document.querySelector('.active img').alt;

        document.querySelector('.slide img').src = newSrc;
        document.querySelector('.slide img').alt = newAlt;
        document.querySelector('.slide p').textContent = caption;

      } else if (child.tagName === 'VIDEO') {

        document.querySelector('.slide video source').src = newSrc;
        document.querySelector('.slide video ~ p').textContent = caption;
      }
    }
  }

  updateToVideo() {
    const slideDom = this.$lightboxContainer.querySelector('.slide.update');
    slideDom.innerHTML = '<video controls class="video_media"><source src"#" type="video/mp4"></video><p></p>';
  }

  updateToImage() {
    const slideDom = this.$lightboxContainer.querySelector('.slide.update');
    slideDom.innerHTML = '<img src"#" class="img_media" alt><p></p>';
  }

  nextControl() {
    if (!document.querySelector('.slide').classList.contains('update')) {
      this.$lightboxContainer.querySelector('.slide').classList.add('update'); 
    }

    const lastLink  = this.$mediaLinks[this.$mediaLinks.length -1];
    const firstLink = this.$mediaLinks[0];

    if (lastLink.classList.contains('active')) {
      this.$mediaLinks
        .find(el => el === lastLink)
        .classList.remove('active');

      this.$mediaLinks
        .find(el => el === firstLink)
        .classList.add('active');

      this.showSlide();

    } else {
      const index = this.$mediaLinks
        .findIndex(el => el.className === 'active');

      const currentLink = this.$mediaLinks[index];
      const nextLink    = this.$mediaLinks[index + 1];

      if (nextLink.getAttribute('data-media') !== 'image') {
        this.updateToVideo();
      } 

      if (nextLink.getAttribute('data-media') !== 'video') {
        this.updateToImage();
      } 

      this.$mediaLinks
        .find(el => el === currentLink).classList.remove('active');

      this.$mediaLinks
        .find(el => el === nextLink).classList.add('active');

      this.showSlide();
    }
  }

  previousControl() {
    if (!document.querySelector('.slide').classList.contains('update')) {
      this.$lightboxContainer.querySelector('.slide').classList.add('update'); 
    }

    const lastLink  = this.$mediaLinks[this.$mediaLinks.length -1];
    const firstLink = this.$mediaLinks[0];

    if (firstLink.classList.contains('active')) {
      this.$mediaLinks
        .find(el => el === firstLink).classList.remove('active');

      this.$mediaLinks
        .find(el => el === lastLink).classList.add('active');

      this.showSlide();

    } else {
      const index        = this.$mediaLinks.findIndex(el => el.className === 'active');
      const currentLink  = this.$mediaLinks[index];
      const previousLink = this.$mediaLinks[index - 1];

      if (previousLink.getAttribute('data-media') !== 'image') {
        this.updateToVideo();
      } 

      if (previousLink.getAttribute('data-media') !== 'video') {
        this.updateToImage();
      } 

      this.$mediaLinks
        .find(el => el === currentLink)
        .classList.remove('active');
      this.$mediaLinks
        .find(el => el === previousLink)
        .classList.add('active');

      this.showSlide();
    }
  }

  onKeyUpModal(e) {
    super.onKeyUpModal(e);
    
    if (this.$modal.style.display !== 'none') {
      if (e.key === 'Escape') {
        this.closeModal(e);
      } else if (e.key === 'ArrowLeft') {
        this.previousControl();
      } else if (e.key === 'ArrowRight') {
        this.nextControl();
      }
    }
  }

  closeModal() {
    super.closeModal();
    this.disableMedia();
  }
}