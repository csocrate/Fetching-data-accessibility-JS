/**
 * ------------------------------------------------------------
 * Fisheye factories/PhotographerFactory.js
 * ------------------------------------------------------------
 */

 class PhotographerFactory {
   /**
    * Returns a new Photographer with photographers properties
    * Returns a new Media with media properties
    * @param {Object} data 
    * @param {string} type
    * @returns {Object | Object} Photographer | Media
    */
  constructor(data, type) {
    if (type === "photographers" || type === "photographer") {

      return new Photographer(data);

    } else if (type === "media") {

      return new Media(data);

    } else {      
      throw 'Unknown type format';
    }
  }
}