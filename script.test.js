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
      let indexOfElement = map.array.indexOf(element);
      map.remove(map.array.indexOf(element));
      expect(map.load).toBe(load - substractCounter);
      expect(map.array[indexOfElement]).toBeUndefined();
      substractCounter++;
    });
  });
});
describe("length() function test unit", () => {
  test("Return the right length", () => {
    for (let i = 0; i < personArr.length; i++) {
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let length = 0;
    map.array.forEach(() => {
      length++;
    });
    expect(map.length()).toBe(length);
  });
});
describe("clear() function test unit", () => {
  test("Successfully clears the hash map and reset load", () => {
    for (let i = 0; i < personArr.length; i++) {
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let isEmptyMock = jest.fn(() => {
      {
        let isEmpty = true;
        for (let i = 0; i < map.array.length; i++) {
          if (map.array[i]) {
            return false;
          }
        }
        return isEmpty;
      }
    });
    map.clear();
    expect(isEmptyMock()).toBeTruthy();
    expect(map.load).toBe(0);
  });
});
describe("keys() function test unit", () => {
  test("Returns an empty array if no data is in the hashmap", () => {
    expect(map.keys()).toEqual([]);
  });
  test("Verify that returned keys fits the occupied keys in array", () => {
    for (let i = 0; i < personArr.length; i++) {
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let mapArr = [];
    map.array.forEach((element) => {
      mapArr.push(map.array.indexOf(element));
    });
    expect(map.keys()).toEqual(mapArr);
  });
});
describe("values() function test unit", () => {
  test("Returns an empty array if no data is in the hashmap", () => {
    expect(map.values()).toEqual([]);
  });
  test("Returns accurately the array of every values in the hash map", () => {
    for (let i = 0; i < personArr.length; i++) {
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let mapArr = [];
    map.array.forEach((element) => {
      mapArr.push(element);
    });
    expect(map.values()).toEqual(JSON.stringify(mapArr));
  });
});
describe("entries() function test unit", () => {
  test("Returns empty array if no data populate the hash map", () => {
    expect(map.entries()).toEqual([]);
  });
  test("Returns array that accurately contains an array of key, value pair", () => {
    for (let i = 0; i < personArr.length; i++) {
      map.set(personArr[i].firstName, personArr[i].lastName);
    }
    let keyValueArr = [];
    map.array.forEach((element) => {
      let pairArr = [
        map.array.indexOf(element),
        `${element.firstName} ${element.lastName}`,
      ];
      keyValueArr.push(pairArr);
    });
    expect(map.entries()).toEqual(keyValueArr);
  });
});
