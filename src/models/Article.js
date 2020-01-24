class Article {
  constructor({ title = "", url = "", description = "" }) {
    this.title = title.trim()
    this.url = url.trim()
    this.description = description.trim()
    this.errors = []
  }

  validate() {
    this.errors = []
    if (this.title === "") {
      this.errors.push("Title can't be blank")
    }

    if (this.description.length < 20) {
      this.errors.push("Description must be greater than 20 characters")
    }

    if (!this.url.startsWith("https://")) {
      this.errors.push("URL must start with https://")
    }
    return this.isValid()
  }

  isValid() {
    return this.errors.length === 0
  }
}

module.exports = Article