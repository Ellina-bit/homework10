const { faker } = require('@faker-js/faker')

const EmailBuilder = function () {
  this.addLogin = function () {
    this.login = faker.name.firstName()
    return this
  }
  this.addDomain = function () {
    this.domain = faker.internet.domainName()
    return this
  }
  this.generate = function () {
    const fields = Object.getOwnPropertyNames(this);
    const data = {};

    fields.forEach((fieldName) => {
      if (this[fieldName] && typeof this[fieldName] !== 'function') {
        data[fieldName] = this[fieldName]
      }
    })
    return data;
  }
  this.generateValidEmail = function () {
    var data = this.generate();
    return `${data.login}@${data.domain}`;
  }


}

export default EmailBuilder