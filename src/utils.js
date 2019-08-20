const checkKeysAndValues = keys => obj => {
  return keys.every(({key, validation}) => {
    return obj.hasOwnProperty(key) && validation(obj[key]) 
  })
} 

const isNumber = val => typeof val === 'number'

const isArray = val => Array.isArray(val)

const isArrayOfNumbers = val => isArray(val) && val.every(isNumber)

module.exports = {
  checkKeysAndValues,
  isNumber,
  isArray,
  isArrayOfNumbers
}