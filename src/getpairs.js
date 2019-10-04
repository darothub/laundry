const getSock = (arr) => {
    return arr.reduce((acc, cur) => {
        acc.sock = 0

        acc[cur] = acc[cur] + 1 || 1
        let pairValue = Object.values(acc)
        // let div = pairs.filter(item => item >= 2).map(item => { return Math.floor(item / 2) }).reduce((acc, cur) => { return acc + cur }, 0)
        let div = pairValue.reduce((acc, cur) => {
            let current = cur >= 2 ? Math.floor(cur / 2) : false
            return acc + current
        }, 0)
        acc.sock = div
        return acc
    }, {})

}

const sieve =(a, b)=>{
    return a.reduce((acc, cur) =>{
        
    }, [])
}
console.log(sieve([1,2,3,1,2,4,5], [1,5]))
module.exports = getSock