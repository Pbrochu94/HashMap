import { map, hash } from "./script";

let personArr = [
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

beforeEach(() => {
  map.clear();
});

describe("map.set() test unit", () => {
  test("Check if set value correctly into the array if index is not occupied", () => {
    let newPerson = { firstName: "Chuck", lastName: "Norris" };
    let personNotAdded = { firstName: "Bruce", lastName: "lee" };
    let functionMock = jest.fn((person) => {
      let isThere = false;
      map.array.forEach((element) => {
        if (JSON.stringify(element) === JSON.stringify(person)) {
          isThere = true;
        }
      });
      return isThere;
    });
    map.set(newPerson.firstName, newPerson.lastName);
    expect(functionMock(newPerson)).toBeTruthy();
    expect(functionMock(personNotAdded)).toBeFalsy();
  });
  test("Check if value is successfully ignore if same value and index is added", () => {
    let person1 = { firstName: "Sylvester", lastName: "Stallone" };
    let dupe = { firstName: "Sylvester", lastName: "Stallone" };
    map.set(person1.firstName, person1.lastName);
    map.set(dupe.firstName, dupe.lastName);
    let isDupeMock = jest.fn((array, valueToCheck) => {
      let counter = 0;
      array.forEach((element) => {
        if (element.nextPerson) {
          let currentListElement = element; //initialize a new var to traverse list and not lose track of the array index
          while (currentListElement.nextPerson) {
            if (JSON.stringify(element) === JSON.stringify(valueToCheck)) {
              counter++;
            }
            currentListElement = currentListElement.nextPerson;
          }
        } else {
          if (JSON.stringify(element) === JSON.stringify(valueToCheck)) {
            counter++;
          }
        }
      });
      if (counter > 0) {
        return true;
      }
      return false;
    });
    expect(isDupeMock(map.array, dupe)).toBeFalsy();
  });
  test("Check if the load of map is updating after each add in index", () => {
    map.clear();
    for (let i = 0; i < 5; i++) {
      //add 5 element but 2 in the same index as a linked list
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let numberOfIndexedData = 0;
    map.array.forEach((element) => {
      numberOfIndexedData++;
    });
    expect(map.load).toBe(numberOfIndexedData);
  });
});
describe("get() function testing unit", () => {
  test("Check if returns null if required index is empty/out of bound", () => {
    expect(map.get(24)).toBeNull();
  });
  test("Check if returns accurate data according to the index", () => {
    for (let i = 0; i < 5; i++) {
      //add 5 element but 2 in the same index as a linked list
      let hashNumber = hash(personArr[i].lastName);
      map.set(personArr[i].firstName, personArr[i].lastName);
      expect(map.get(hashNumber)).toBe(map.array[hashNumber]);
    }
  });
});
describe("has() function test unit", () => {
  for (let i = 0; i < 5; i++) {
    //add 5 element but 2 in the same index as a linked list
    map.set(personArr[i].firstName, personArr[i].lastName);
  }
  test("Returns false if there is no data to the asked index", () => {
    expect(map.has(1003040)).toBeFalsy();
  });
  test("Returns true if there is data to the asked index", () => {
    for (let i = 0; i < 5; i++) {
      //add 5 element but 2 in the same index as a linked list
      let hashNumber = hash(personArr[i].lastName);
      map.set(personArr[i].firstName, personArr[i].lastName);
      expect(map.has(hashNumber)).toBeTruthy();
    }
  });
});
describe("remove() function test unit", () => {
  test("Return false if the index is empty", () => {
    expect(map.remove(121049)).toBeFalsy();
  });
  test("Successfully remove the key value", () => {
    for (let i = 0; i < 5; i++) {
      //add 5 element but 2 in the same index as a linked list
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let load = map.load;
    let substractCounter = 1;
    map.array.forEach((element) => {
      console.log(map.load, load, substractCounter);
      map.remove(map.array.indexOf(element));
      expect(map.load).toBe(load - substractCounter);
      substractCounter++;
    });
    console.log(map);
  });
});
