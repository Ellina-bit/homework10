const { faker } = require('@faker-js/faker');

const BuildUser = function () {
  this.addEmail = function () {
    this.email = faker.internet.email();
    return this;
  };
  this.addUsername = function () {
    this.username = faker.name.firstName();
    return this;
  };
  this.addPassword = function () {
    this.password = faker.internet.password();
    return this;
  };
  this.generate = function () {
    const fields = Object.getOwnPropertyNames(this);
    const data = {};

    fields.forEach((fieldName) => {
      if (this[fieldName] && typeof this[fieldName] !== 'function') {
        data[fieldName] = this[fieldName];
      }
    });
  };
};

export default BuildUser;
