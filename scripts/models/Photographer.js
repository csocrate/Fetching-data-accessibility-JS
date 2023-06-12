/**
 * ------------------------------------------------------------
 * Fisheye models/Photographer.js
 * ------------------------------------------------------------
 */

class Photographer {
  /**
   * To create getters of photographers properties
   * @param {Object} data - list of objects from .json file
   */
  constructor(data) {
    this._name = data.name
    this._id = data.id
    this._portrait = data.portrait
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
  }

  // Gets photographer name
  get name() {
    return this._name
  }

  // Gets photographer id
  get id() {
    return this._id
  }

  // Gets photographer portrait
  get portrait() {
    return `assets/photographers/${this._portrait}`
  }

  // Gets photographer city
  get city() {
    return this._city
  }

  // Gets photographer country
  get country() {
    return this._country
  }

  // Gets photographer tagline
  get tagline() {
    return this._tagline
  }

  // Gets photographer price
  get price() {
    return this._price
  }
}