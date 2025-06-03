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
  set(key, value) {
    let index = key;
    if (index < 0 || index >= this.capacity) {
      //space limitation
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.array[index]) {
      //is array is not occupied
      this.array[index] = value;
      this.load++;
    } else {
      if (
        //if the values at the same index are the same
        this.array[index].firstName === value.firstName &&
        this.array[index].lastName === value.lastName
      ) {
        return;
      }
      this.array[index].nextPerson = value;
    }
    if (this.load === Math.ceil(this.capacity - (this.capacity / 100) * 20)) {
      this.capacity *= 2;
      let arrHolder = this.array;
      this.array = [];
      arrHolder.forEach((element) => {
        //need to rehash every value with new capacity modulo
        hash(element);
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
}

function hash(person) {
  let key = person.lastName;
  //hashing function
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }
  hashCode %= map.capacity; //to reduce the hashcode to fit our array of 16
  map.set(hashCode, person);
}

//testing zone ------------------------------

let map = new HashMap();

let personArr = [
  { firstName: "Patrick", lastName: "Brochu" },
  { firstName: "Patrick", lastName: "Brochu" },
  { firstName: "Delphine", lastName: "Henri" },
  { firstName: "Francois", lastName: "Medina" },
  { firstName: "Michel", lastName: "Brochu" },
  { firstName: "Maria", lastName: "Jinnie" },
  { firstName: "Robert", lastName: "California" },
  { firstName: "Michel", lastName: "Scott" },
  { firstName: "Jim", lastName: "Halpert" },
  { firstName: "Dwight", lastName: "Shroute" },
  { firstName: "Angela", lastName: "Nata" },
  { firstName: "Eddie", lastName: "Hall" },
  { firstName: "Light", lastName: "Yagami" },
  { firstName: "Near", lastName: "Lawliet" },
  { firstName: "Miheel", lastName: "Niel" },
  { firstName: "Misa", lastName: "Amane" },
  { firstName: "Mira", lastName: "Totoro" },
  { firstName: "Misao", lastName: "Atatas" },
  { firstName: "Akura", lastName: "Atame" },
  { firstName: "Patrick", lastName: "Brochu" },
];

for (let i = 0; i < personArr.length; i++) {
  hash(personArr[i]);
}

console.log(map);
map.clear();
console.log(map);
