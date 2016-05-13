class Utiles {
  constructor() {

  }

  isEmpty(value) {
    let isEmpty = (value === '');
    return isEmpty;
  }

  cleanText(value) {
    if (!this.isEmpty(value)) {
      return value.trim();
    }

    return value;
  }
}

module.exports = Utiles;
