class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographers" || type === "photographer") {
      return new Photographer(data)
    }
  }
}