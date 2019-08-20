#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const jsYaml = require('js-yaml')

const { isMixtapeValid } = require('./inputs/validations')
const { processChanges } = require('./process/index')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// Prints pretty error if file is not found
const handleFileNotFound = error => {
  if(error.code === 'ENOENT'){
    throw new Error(`${error.path} not found`)
  }
  else {
    throw error
  }
}

// gets input JSON from file, parses it
// and validates the object
const getAndValidateInput = path => {
  return readFile(path, 'utf-8')
  .catch(handleFileNotFound)
  .then(text => {
    const json = JSON.parse(text)
    if(!isMixtapeValid(json))
      throw new Error(`${path} is not formatted correctly`)
    return json
  })
}

// get changes file and parses it
const getChanges = path => {
  return readFile(path, 'utf-8')
  .catch(handleFileNotFound)
  .then(jsYaml.safeLoad)
}

// wraps extra options of strigstringifyify for ease of use
const JSONstringify = obj => JSON.stringify(obj, null, 2)

// wraps the file writer to be properly piped through
const write = path => text => writeFile(path, text)

// prints usage details if something has gone wrong
const printUsage = fileName => {
  console.log(`${fileName} file is not defined`)
  console.log('Usage: ')
  console.log('killer-app input_file.json changes_file.yml output_file.json')
}

const main = ([ input, changes, output ]) => {
  if(!input) {
    printUsage('Input')
    process.exit(1)
  }
  
  if(!changes) {
    printUsage('Changes')
    process.exit(1)
  }
  
  if(!output) {
    printUsage('Output')
    process.exit(1)
  }
  
  const inputPath = path.join(process.env.PWD, input)
  const changesPath = path.join(process.env.PWD, changes)
  const outputPath = path.join(process.env.PWD, output)
  
  
  // Process flow
  Promise.all([
    getAndValidateInput(inputPath),
    getChanges(changesPath)
  ])
  .then(processChanges)
  .then(JSONstringify)
  .then(write(outputPath))
  .catch(error => console.log('Error - ', error.message)) 
}

///////////////////////////////////////////////////////////////////////////////
// Entry Point
///////////////////////////////////////////////////////////////////////////////
main(process.argv.slice(2))

module.exports = main

