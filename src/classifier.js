// const immutable = require('../fixtures/inputs/input')
// const edge = require('../fixtures/inputs/edge-input')
/**
 * This is the entry point to the program
 *
 * @param {any} input Array of student objects
 */
// const input = [{ name: 'Hendrick', dob: '1853-07-18T00:00:00.000Z', regNo: '041', }, { name: 'Albert', dob: '1910-03-14T00:00:00.000Z', regNo: '033', }, { name: 'Marie', dob: '1953-11-07T00:00:00.000Z', regNo: '024', }, { name: 'Neils', dob: '1853-10-07T00:00:00.000Z', regNo: '02', }, { name: 'Max', dob: '1853-04-23T00:00:00.000Z', regNo: '014', }, { name: 'Erwin', dob: '1854-08-12T00:00:00.000Z', regNo: '09', }, { name: 'Auguste', dob: '1854-01-28T00:00:00.000Z', regNo: '08', }, { name: 'Karl', dob: '1852-12-05T00:00:00.000Z', regNo: '120', }, { name: 'Louis', dob: '1852-08-15T00:00:00.000Z', regNo: '022', }, { name: 'Arthur', dob: '1892-09-10T00:00:00.000Z', regNo: '321', }, { name: 'Paul', dob: '1902-08-08T00:00:00.000Z', regNo: '055', }, { name: 'William', dob: '1890-03-31T00:00:00.000Z', regNo: '013', }, { name: 'Owen', dob: '1853-04-26T00:00:00.000Z', regNo: '052', }, { name: 'Martin', dob: '1854-02-15T00:00:00.000Z', regNo: '063', }, { name: 'Guye', dob: '1854-10-15T00:00:00.000Z', regNo: '084', }, { name: 'Charles', dob: '1954-02-14T00:00:00.000Z', regNo: '091', },];
const input = [
  {
    name: 'Hendrick',
    dob: '1853-07-18T00:00:00.000Z',
    regNo: '041',
  },
  {
    name: 'Albert',
    dob: '1879-03-14T00:00:00.000Z',
    regNo: '033',
  },
  {
    name: 'Marie',
    dob: '1867-11-07T00:00:00.000Z',
    regNo: '024',
  },
  {
    name: 'Neils',
    dob: '1885-10-07T00:00:00.000Z',
    regNo: '02',
  },
  {
    name: 'Max',
    dob: '1858-04-23T00:00:00.000Z',
    regNo: '014',
  },
  {
    name: 'Erwin',
    dob: '1887-08-12T00:00:00.000Z',
    regNo: '09',
  },
  {
    name: 'Auguste',
    dob: '1884-01-28T00:00:00.000Z',
    regNo: '08',
  },
  {
    name: 'Karl',
    dob: '1901-12-05T00:00:00.000Z',
    regNo: '120',
  },
  {
    name: 'Louis', //
    dob: '1892-08-15T00:00:00.000Z',
    regNo: '022',
  },
  {
    name: 'Arthur',
    dob: '1892-09-10T00:00:00.000Z',
    regNo: '321',
  },
  {
    name: 'Paul',
    dob: '1902-08-08T00:00:00.000Z',
    regNo: '055',
  },
  {
    name: 'William',
    dob: '1890-03-31T00:00:00.000Z',
    regNo: '013',
  },
  {
    name: 'Owen',
    dob: '1879-04-26T00:00:00.000Z',
    regNo: '052',
  },
  {
    name: 'Martin',
    dob: '1871-02-15T00:00:00.000Z',
    regNo: '063',
  },
  {
    name: 'Guye',
    dob: '1866-10-15T00:00:00.000Z',
    regNo: '084',
  },
  {
    name: 'Charles',
    dob: '1868-02-14T00:00:00.000Z',
    regNo: '091',
  },
];

module.exports = input;


function classifier(input) {
  let newInput = JSON.parse(JSON.stringify(input));

  //check input is of array type
  if (!Array.isArray(newInput)) {

    throw new Error("invalid")
  }
  if (newInput.length < 1) {
    return exampleOutput = { noOfGroups: 0 }
  }

  // Compute age from DOB.
  const data = newInput.map(item => {
    let age = new Date().getFullYear() - new Date(item.dob).getFullYear();
    return { ...item, age };
  });
  // console.log(data)
  //compare function to sort with age
  const compare = (a, b) => {
    const { age: ageA } = a
    const { age: ageB } = b
    return ageA - ageB
  }
  //sorting
  data.sort(compare)
  // console.log(data)
  //Reducing data
  var result = data.reduce((acc, curr) => {
    console.log(acc)
    // console.log(Object.values(acc))
    //check for group
    let group = Object.values(acc).find(group => group.members && group.members.length < 3
      && group.members.every(member => Math.abs(member.age - curr.age) <= 5));
      console.log(group)
    if (group) { // if members exist push into group
      group.members.push(curr);
      group.regNos.push(parseInt(curr.regNo));
      group.regNos.sort((a, b) => a > b ? 1 : -1);
      group.oldest = Math.max(...group.members.map(member => member.age));
      group.sum = group.sum + curr.age;
    } else { //else create the group and put current  members
      acc.noOfGroups = acc.noOfGroups + 1 || 1;
      let groupName = "group" + acc.noOfGroups;
      acc[groupName] = {
        "members": [curr],
        "oldest": curr.age,
        "sum": curr.age,
        "regNos": [parseInt(curr.regNo)],
      };
    }

    return acc;
  }, {});
  return result
  // console.log(result);
}

// Object.freeze(edge)
const out = classifier(input)
console.log(out)

module.exports = classifier;