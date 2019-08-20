const { expect } = require('chai')

const { isMixtapeValid } = require('../src/inputs/validations')



describe('hasKeysMixtapeKeys', function(){
  it('should return true if the obj has the appropriate keys with appropriate types', function(){
    const obj = { songs: [], users: [], playlists: [] }

    const actual = isMixtapeValid(obj)

    expect(actual).to.deep.equal(true)
  })

  it('should return false if the obj has the appropriate keys without the appropriate types', function(){
    const obj = { songs: {}, users: '', playlists: 123 }

    const actual = isMixtapeValid(obj)

    expect(actual).to.deep.equal(false)
  })

  it('should return false if the obj does not have the appropriate keys', function(){
    const obj = { song: [], user: [], playlist: [] }

    const actual = isMixtapeValid(obj)

    expect(actual).to.deep.equal(false)
  })
})