    /**
     * 
     * @returns {Object | Array} photographersData
     */
    async function getPhotographers() {

      const photographersData = await fetch("/data/photographers.json") // Promise about list of photographers (and media)
        .then(response => response.json()) // Response object
        .then(body => body.photographers) // Content of response expected (photographers only)
        .catch(err => console.log('An error occurs', err)) // If promise is not ok, error

      // console.log(photographersData)
      return photographersData;      
    }

    /**
     * 
     * @param {Object | Array}} photographers 
     */
    async function displayData(photographers) {
      const photographersSection = document.querySelector(".photographer_section");
      
      for (let photographer of photographers) {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      };
    };

    /**
     * Gets photographers data
     */
    async function init() {
      const photographers = await getPhotographers();
      displayData(photographers);
    };
    init();
    
