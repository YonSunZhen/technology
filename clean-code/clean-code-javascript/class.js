// Prefer ES2015/ES6 classes over ES5 plain functions
const Animal = function(age) {
  if(!this instanceof Animal) {
    throw new Error('Instantiate Animal with `new`');
  }
  this.age = age;
};

Animal.prototype.move = function move() {}

const Mammal = function(age, furColor) {
  if(!(this instanceof Mammal)) {
    throw new Error('Instantiate Mammal with `new`');
  }

  Animal.call(this, age);
  this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
  if (!(this instanceof Human)) {
    throw new Error('Instantiate Human with `new`');
  }

  Mammal.call(this, age, furColor);
  this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {
  console.log('debug1');
  console.log(this.age);
};

const human = new Human(1, 'yellow', 'cn')
human.speak();

class Animal {

  constructor(age) {
    this.age = age;
  }

  move() {}
}

class Mammal extends Animal {

  constructor(age, furColor) {
    super(age);
    this.furColor = furColor;
  }

  liveBirth() {}
}

class Human extends Mammal {

  constructor(age, furColor, languageSpoken) {
    super(age, furColor);
    this.languageSpoken = languageSpoken;
  }

  speak() {
    console.log('debug1');
    console.log(this.age);
  }

}

const human = new Human(1, 'yellow', 'cn');
human.speak();

// Use method chaining
class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  setMake(make) {
    this.make = make;
  }
  setModel(model) {
    this.model = model;
  }
  setColor(color) {
    this.color = color;
  }
  save() {
    console.log(this.make, this.model, this.color);
  }
}

const car = new Car('Ford', 'F-150', 'red');
car.setColor('pink');
car.save();

class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  setMake(make) {
    this.make = make;
    return this;
  }
  setModel(model) {
    this.model = model;
    return this;
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  save() {
    console.log(this.make, this.model, this.color);
    return this;
  }
}
const car = new Car('Ford', 'F-150', 'red').setColor('pink').save();

// Prefer composition over inheritance
class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // ...
}
// 不好是因为雇员“有”税率数据，EmployeeTaxData不是一个Employee类型
class EmployTaxData extends Employee {
  constructor(ssn, salary) {
    super();
    this.ssn = ssn;
    this.salary = salary;
  }

  // ...
}

class EmployeeTaxData {
  constructor(ssn, salary) {
    this.ssn = ssn;
    this.salary = salary;
  }
  // ...
}
class Employ {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  setTaxData(ssn, salary) {
    this.taxData = new EmployeeTaxData(ssn, salary);
  }
  // ...
}

// Single Responsibility Principle (SRP)
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}

class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if(this.auth.verifyCredentials()) {
      // ...
    }
  }
}

// Open/Closed Principle(OCP)
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if(this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then(response => {

      });
    } else if(this.adapter.name === 'nodeAdapter') {
      return makeHttpCall(url).then(response => {

      });
    }
  }
}

function makeAjaxCall(url) {

}
function makeHttpCall(url) {

}


class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }

  request(url) {
    // request and return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
    // request and return promise
  }
}

class HttpRequest {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then(reponse => {
      // transform response and return 
    });
  }
}
