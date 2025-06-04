class Person {
  constructor(firstName, lastName) {
    this.firstName;
    this.lastName;
  }
}

class HashMap {
  //hashmap
  constructor() {
    this.load = 0;
    this.capacity = 16;
    this.array = [];
  }
  set(value, key) {
    let person = { firstName: value, lastName: key }; //change the key/value into an object
    let index = hash(key);
    if (index < 0 || index >= this.capacity) {
      //space limitation
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.array[index]) {
      //is array is not occupied
      this.array[index] = person;
      this.load++;
    } else {
      if (
        //if the values at the same index are the same
        this.array[index].firstName === value.firstName &&
        this.array[index].lastName === value.lastName
      ) {
        return;
      }
      this.array[index].nextPerson = person;
    }
    if (this.load === Math.ceil(this.capacity - (this.capacity / 100) * 20)) {
      this.capacity *= 2;
      let arrHolder = [];
      this.array.forEach((element) => {
        arrHolder.push(element);
      });
      this.array = [];
      arrHolder.forEach((element) => {
        //need to rehash every value with new capacity modulo
        map.set(element.firstName, element.lastName);
      });
    }
  }
  get(key) {
    if (!this.array[key]) {
      return null;
    }
    return this.array[key];
  }
  has(key) {
    if (!this.array[key]) {
      return false;
    }
    return true;
  }
  remove(key) {
    if (!this.array[key]) {
      return false;
    }
    delete this.array[key];
    this.load--;
  }
  length() {
    let total = 0;
    this.array.forEach((element) => {
      total++;
    });
    return total;
  }
  clear() {
    this.array = [];
    this.load = 0;
    this.capacity = 16;
  }
  keys() {
    let indexArr = [];
    this.array.forEach((element) => {
      indexArr.push(this.array.indexOf(element));
    });
    return indexArr;
  }
  values() {
    let valuesArr = [];
    this.array.forEach((element) => {
      valuesArr.push(element);
    });
    return JSON.stringify(valuesArr);
  }
  entries() {
    let valuesWithObjArr = [];
    this.array.forEach((element) => {
      valuesWithObjArr.push([
        this.array.indexOf(element),
        `${element.firstName} ${element.lastName}`,
      ]);
    });
    return valuesWithObjArr;
  }
}

function hash(lastName) {
  //hashing function
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < lastName.length; i++) {
    hashCode = primeNumber * hashCode + lastName.charCodeAt(i);
  }
  hashCode %= map.capacity; //to reduce the hashcode to fit our array of 16
  return hashCode;
}

//testing zone ------------------------------

let map = new HashMap();
console.log(map);

export { map, hash };
