const actions = require('../changes')

const processChanges = ([input, changes]) => {
  if(!Array.isArray(changes)) throw new Error('Changes YAML file is not properly formatted')

  return changes.reduce((acc, change, idx) => {
    // get name of action from change object,
    // eg, { addPlaylistToUser: { playlist: 1, user: 1}}

    // if yaml is not properly formatted, action name will be undefined
    const actionName = Object.keys(change)[0]
    if(!actionName) throw new Error(`Action number ${idx + 1} yaml is not formatted properly`)

    // if the actionName is not listed in the known actions
    // throw error
    if(!actions.hasOwnProperty(actionName))
      throw new Error(`Action number ${idx + 1} is not defined`)

    // get known action given actionName
    const action = actions[actionName]

    // make sure that yaml has correct information
    if(!action.isValid(change[actionName]))
      throw new Error(`Action number ${idx + 1} is invalid`)
     
    // apply changes to data structure
    return action.apply(acc, change[actionName])

  }, input)
}

module.exports = { 
  processChanges
}