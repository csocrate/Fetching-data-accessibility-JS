class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographers") {
      return new Photographer(data)
    }
  }
}