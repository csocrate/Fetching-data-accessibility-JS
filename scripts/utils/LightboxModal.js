/**
 * ------------------------------------------------------------
 * Fisheye utils/LightboxModal.js
 * ------------------------------------------------------------
 */

/**
 * @extends Modal
 */
class LightboxModal extends Modal {
  /**
   * Create a lightbox modal
   * @param {HTMLElement} body - body element
   * @param {HTMLElement} modal - modal element
   * @param {HTMLElement} launchingTarget - trigger element that opens modal
   * @param {HTMLElement} closingTarget - trigger element that close modal
   */
  constructor(
    body,
    modal,
    launchingTarget,
    closingTarget
  ) {
    super(body, modal, launchingTarget, closingTarget);

    this.$nextBtn = document.querySelector('.next-btn');
    this.$previousBtn = document.querySelector('.previous-btn');
    this.$mediaLinks = Array.from(document.querySelectorAll('.media a'));
    this.$lightboxContainer = document.querySelector('.modal .lightbox');

    /**
     * @see nextControl()
     */
    this.$nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.nextControl();
    });

    /**
     * @see previousControl()
     */
    this.$previousBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.previousControl();
    });
  }

  /**
   * Update getModal() method defined on the parent object
   * To Create lightbox container and its contents
   * @see createSlide()
   * @see showSlide()
   */
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

  /**
   * When lightbox modal will be closed, 
   * cleans all that display slide
   */
  disableMedia() {
    const slide = this.$lightboxContainer.querySelector('.slide');

    this.$mediaLinks
      .forEach(mediaLink => {
        if (mediaLink.classList.contains('active')) {
          mediaLink.classList.remove('active');
        }
      });

    if (document.contains(slide)) {
      if (slide.classList.contains('update')) {
        slide.classList.remove('update');
      }
      slide.remove();
    }
  }

  /**
   * Template slide
   */
  createSlide() {
    const slideDom = document.createElement('figure');
    slideDom.classList.add('slide');

    this.$mediaLinks
      .filter(el => el.querySelector('img'))
      .forEach(el => {
        el.dataset.media = 'image';
      });

    this.$mediaLinks
      .filter(el => el.querySelector('video'))
      .forEach(el => {
        el.dataset.media = 'video';
      });

    this.$mediaLinks
      .forEach(link => {
        if (link.classList.contains('active')) {

          if (link.getAttribute('data-media') === 'image') {
            slideDom.innerHTML = '<img src="#" class="img_media" alt><figcaption></figcaption>';
          }

          if (link.getAttribute('data-media') === 'video') {
            slideDom.innerHTML = '<video controls class="video_media"><source src"#" type="video/mp4"></video><figcaption></figcaption>';
          }
        }
      })
    this.$lightboxContainer.prepend(slideDom);
  }

  /**
   * Sets media's source, media's name and caption
   */
  showSlide() {

    const mediaLink = this.$mediaLinks
      .find(el => el.classList.contains('active'));

    const figCaption = mediaLink.nextElementSibling;

    for (const child of mediaLink.childNodes) {

      const newSrc = mediaLink.href;
      const caption = figCaption.textContent;
      const slide = this.$lightboxContainer.querySelector('.slide');

      if (document.contains(slide)) {

        if (child.tagName === 'IMG') {
          const newAlt = document.querySelector('.active img').alt;

          slide.querySelector('img').src = newSrc;
          slide.querySelector('img').alt = newAlt;
          slide.querySelector('figcaption').textContent = caption;

        } else if (child.tagName === 'VIDEO') {

          slide.querySelector('video source').src = newSrc;
          slide.querySelector('video ~ figcaption').textContent = caption;
        }
      }
    }
  }

  /**
   * Changes current media for video when slide is updated on controls
   */
  updateToVideo() {
    const updatedSlide = this.$lightboxContainer.querySelector('.slide.update');

    if (document.contains(updatedSlide)) {
      updatedSlide.innerHTML = '<video controls class="video_media"><source src"#" type="video/mp4"></video><figcaption></figcaption>';
    }
  }

  /**
   * Changes current media for image when slide is updated on controls
   */
  updateToImage() {
    const updatedSlide = this.$lightboxContainer.querySelector('.slide.update');

    if (document.contains(updatedSlide)) {
      updatedSlide.innerHTML = '<img src"#" class="img_media" alt><figcaption></figcaption>';
    }
  }

  /**
   * Handle next control on lightbox
   * @see updateToVideo()
   * @see updateToImage()
   * @see showSlide()
   */
  nextControl() {
    const slide = this.$lightboxContainer.querySelector('.slide');

    if (document.contains(slide)) {
      if (!slide.classList.contains('update')) {
        slide.classList.add('update');
      }
    }

    const lastLink = this.$mediaLinks[this.$mediaLinks.length - 1];
    const firstLink = this.$mediaLinks[0];

    const index = this.$mediaLinks
      .findIndex(el => el.className === 'active');

    const currentLink = this.$mediaLinks[index];
    const nextLink = index === this.$mediaLinks.length - 1 ? firstLink : this.$mediaLinks[index + 1];

    if (lastLink.classList.contains('active')) {
      this.$mediaLinks
        .find(el => el === lastLink)
        .classList.remove('active');

      this.$mediaLinks
        .find(el => el === firstLink)
        .classList.add('active');

    } else {
      this.$mediaLinks
        .find(el => el === currentLink).classList.remove('active');

      this.$mediaLinks
        .find(el => el === nextLink).classList.add('active');
    }

    if (nextLink.getAttribute('data-media') !== 'image') {
      this.updateToVideo();
    } else if (nextLink.getAttribute('data-media') !== 'video') {
      this.updateToImage();
    }

    this.showSlide();
  }

  /**
   * Handle previous control on lightbox
   * @see updateToVideo()
   * @see updateToImage()
   * @see showSlide()
   */
  previousControl() {
    const slide = this.$lightboxContainer.querySelector('.slide');

    if (document.contains(slide)) {
      if (!slide.classList.contains('update')) {
        slide.classList.add('update');
      }
    }

    const lastLink = this.$mediaLinks[this.$mediaLinks.length - 1];
    const firstLink = this.$mediaLinks[0];

    const index = this.$mediaLinks
      .findIndex(el => el.className === 'active');

    const currentLink = this.$mediaLinks[index];
    const previousLink = index === 0 ? lastLink : this.$mediaLinks[index - 1];

    if (firstLink.classList.contains('active')) {
      this.$mediaLinks
        .find(el => el === firstLink).classList.remove('active');

      this.$mediaLinks
        .find(el => el === lastLink).classList.add('active');

    } else {
      this.$mediaLinks
        .find(el => el === currentLink)
        .classList.remove('active');
      this.$mediaLinks
        .find(el => el === previousLink)
        .classList.add('active');
    }

    if (previousLink.getAttribute('data-media') !== 'image') {
      this.updateToVideo();
    } else if (previousLink.getAttribute('data-media') !== 'video') {
      this.updateToImage();
    }

    this.showSlide();
  }

  /**
   * @see closeModal()
   * @see nextControl()
   * @see previousControl()
   * @param {KeyboardEvent} e 
   */
  onKeyUpModal(e) {
    super.onKeyUpModal(e);

    if (this.$modal.style.display !== 'none') {
      if (e.key === 'Escape') {
        this.closeModal();
      } else if (e.key === 'ArrowLeft') {
        this.previousControl();
      } else if (e.key === 'ArrowRight') {
        this.nextControl();
      }
    }
  }

  /**
   * Update closeModal() method defined on the parent object
   * @see disableMedia()
   */
  closeModal() {
    super.closeModal();
    this.disableMedia();
  }
}