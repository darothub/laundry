function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your solution goes here.
  function compare(a, b){
    return a - b
  }
  //sorting clean socks
  let sortedClean = cleanPile.sort(compare)
    //sorting dirty socks
  let sortedDirty = dirtyPile.sort(compare)

  //Function to get sock pairs and calculate socks
  const getSock = (arr) =>{
    return arr.reduce((acc, cur) => {
      acc.sock = 0
      console.log(cur)
      acc[cur] = acc[cur] + 1 || 1
      let pairValue = Object.values(acc)
      // let div = pairs.filter(item => item >= 2).map(item => { return Math.floor(item / 2) }).reduce((acc, cur) => { return acc + cur }, 0)
      let div = pairValue.reduce((acc, cur) => { 
        let current = cur >= 2 ? Math.floor(cur/2) : false
        return acc + current
      }, 0)
      acc.sock = div
      return acc
    }, {})

  }
  
  let cleanSock = getSock(sortedClean)
  let dirtySock = getSock(sortedDirty)
  console.log(cleanSock)
  console.log(dirtySock)

  
  //  if no of washes is equal to 1
  if(noOfWashes == 1){
    // get common sock that occur once in the dirty socks  and can compliment the clean sock
    let common = sortedDirty.filter(num => sortedClean.includes(num) && cleanSock[num] < 2)
    let result = {}
    sortedClean.push(common[0])
    result = getSock(sortedClean)
    return result.sock
  }
  // if no  of  washes is 1
  else if (noOfWashes > 1){
    let result = {}
    // get common socks to compliment the clean socks
    let commons = sortedDirty.filter(num => (sortedClean.includes(num) && (cleanSock[num] + dirtySock[num]) % 2 == 0) || dirtySock[num] >= 2)
    console.log(commons)
    // arrange the commons in occurence and the number of socks to be gotten
    let commonsPair = getSock(commons)
    // console.log(commonsPair)    
    // console.log(sortedClean)
    let i = 0;
    let j = commons.length
    while (i <= noOfWashes &&j > 0) {
      sortedClean.push(commons[i])
      i++
      j--
    }
    let compliments = getSock(sortedClean)
    // console.log(compliments)
    //if resultof optimized socks after wash is odd (odd baskets of socks) 
    //and the no of washes > 0 
    // get one more socks to compliments the odd one 
    let even = sortedClean.length % 2 != 0 ? commons.filter(num=>  compliments[num] == 1 && commonsPair[num] >  2 ) : compliments
    // console.log(even)
    sortedClean.push(even[0])
    result = getSock(sortedClean)
    return result.sock

  }
 
  // no of washes is zero
  let result;
  result = noOfWashes == 0 && sortedClean.length > 1 ? cleanSock : cleanSock
  return result.sock
 
}

// console.log(Math.floor(4/2))

// noOfWashes: number = 2;
// cleanPile: number[] = [1, 2, 1, 1];
// dirtyPile: number[] = [1, 4, 3, 2, 4];

// const numberMachineCanWash = 2;
// const cleanPile = [1, 2, 3, 1, 2, 3];
// const dirtyPile = [3, 3, 4, 1, 2, 7, 9];

// const numberMachineCanWash = 4;
// const cleanPile = [1, 1, 1, 1, 1, 1];
// const dirtyPile = [1, 2, 2, 1, 3, 4, 5, 2];
// const numberMachineCanWash = 20;
// const cleanPile = [1];
// const dirtyPile = [50, 50, 50, 37, 38, 37, 49, 39, 38, 45, 43];

// const cleanPile = [1];
// const dirtyPile = [1, 2, 3, 4, 5, 5];

// console.log(getMaxPairs(2, [1, 2, 1, 1], [1, 4, 3, 2, 4]))
// console.log(getMaxPairs(2, [1, 2, 3, 1, 2, 3], [3, 3, 4, 1, 2, 7, 9]))
// console.log(getMaxPairs(4, [1, 1, 1, 1, 1, 1], [1, 2, 2, 1, 3, 4, 5, 2]))
// console.log(getMaxPairs(0, [1], [1, 2, 3, 4, 5, 5]))

// const numberMachineCanWash = 50;
// const cleanPile = [40, 40, 40, 40, 40, 40, 40, 50, 50, 50, 50, 50];
// const dirtyPile = [40, 40, 45, 45, 30, 35, 50, 50, 25, 25, 20, 20];

console.log(getMaxPairs(5, [1, 2, 3, 2, 3, 4, 5], [2, 1, 1, 1, 3, 3, 3, 4, 4, 4, 5, 5, 6, 5, 7, 5, 6]))

module.exports = getMaxPairs;
