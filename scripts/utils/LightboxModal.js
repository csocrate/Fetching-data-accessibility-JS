class LightboxModal extends Modal {
  constructor(
    body, 
    modal, 
    launchingTarget, 
    closingTarget,
    media
    ) {

    super(body, modal, launchingTarget, closingTarget)

    this.$Slides      = Array.from(document.querySelectorAll('.slide'))
    this.$nextBtn     = document.querySelector('.next-btn')
    this.$previousBtn = document.querySelector('.previous-btn')

    this._media = media
  }

  get media() {
    return this._media
  }

  createLightboxModal() {
    const div = document.createElement('div')
    div.classList.add('slide')

    const p = document.createElement('p')
    p.textContent = this._media.title

    const a = document.createElement('a')
    
    div.appendChild(a)
    a.innerHTML = this._media.format
    div.appendChild(p)

    return (div)
  }

  disableMedia() {
    const images   = document.querySelectorAll('div.media img')
    const videos = document.querySelectorAll('div.media video')

    const imgSlides   = document.querySelectorAll('div.slide img')
    const videoSlides = document.querySelectorAll('div.slide video')

    images.forEach(img => img.parentNode.removeAttribute('href'))
    videos.forEach(video => video.parentNode.removeAttribute('href'))
    imgSlides.forEach(img => img.parentNode.removeAttribute('name'))
    videoSlides.forEach(video => video.parentNode.removeAttribute('name'))

    this.$Slides.forEach(slide => slide.style.display = 'none')
  }

  handleNextSlide() {
    const currentSlide = document.querySelector('a[name=target_anchor').parentNode
    let currentIndex = this.$Slides.indexOf(currentSlide)
    console.log(currentIndex)

    let n = 0 // index number

    if (currentIndex >= 0) {

      this.$nextBtn.addEventListener('click', () => {

        this.$Slides.forEach(slide => {
          if (slide.querySelector('a').getAttribute('name') === 'target_anchor') {
            slide.querySelector('a').removeAttribute('name')

            // Not display previous element to display next one
            slide.style.display = 'none'
          }
        })
                
        n += 1 // increment index
        const nextSlide = this.$Slides[currentIndex + n]

        this.$Slides.find( slide => {
          slide === nextSlide
          nextSlide.querySelector('a').setAttribute('name', 'target_anchor')
          nextSlide.querySelector('a[name=target_anchor]').parentNode.style.display = 'block'
        })
      })
    }
  }

  init() {    
    this.getModal(
      this.$launchingTarget.forEach(btn => btn.addEventListener('click', (e) => {

        this.$body.classList.add('lightbox')

        if (e.target.className === "img_media" || e.target.className === "video_media") {
          e.target.parentNode.setAttribute('href', '#target_anchor')
  
          const imgCloseupView   = document.querySelectorAll('.slide img')
          const videoCloseupView = document.querySelectorAll('.slide video source')
          
          imgCloseupView.forEach(img => {
  
            if (e.target.src === img.src) {  
              // console.log(img)
              img.parentNode.setAttribute('name', 'target_anchor')

              const targetAnchor = document.querySelector('a[name=target_anchor]')

              if (targetAnchor !== false && targetAnchor.parentNode) {
                targetAnchor.parentNode.style.display = 'block'
              }
            }
          })
          
          videoCloseupView.forEach(video => {
  
            const targetVideo         = e.target.querySelector('source')
            const videoCloseupViewSrc = video.src 
  
            if ((targetVideo.src) === videoCloseupViewSrc) {
              video.parentNode.parentNode.setAttribute('name', 'target_anchor')

              const targetAnchor = document.querySelector('a[name=target_anchor]')

              if (targetAnchor !== false && targetAnchor.parentNode) {
                targetAnchor.parentNode.style.display = 'block'
              }
            }
          })        
        }
        this.handleNextSlide()
      })),
      this.$closingTarget.addEventListener('click', () => {
        this.disableMedia()
      })
    )
  }
}