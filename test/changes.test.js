const { expect } = require('chai')

// const { 
//   isAddPlaylistToUserValid, 
//   isDeletePlayListKeysValid, 
//   isAddSongToPlaylistValid,
//   isChangesValid } = require('../src/validations/changes')


const addSongToPlaylist = require('../src/changes/addSongToPlaylist')
// const addPlaylistToUser = require('../src/changes/addPlaylistToUser')
const deletePlaylist = require('../src/changes/deletePlaylist')
const createPlaylistForUser = require('../src/changes/createPlaylistForUser')


describe('changes', function(){
  let mixtape = {}
  beforeEach(function(){
    mixtape = {
      users: [ 
        { id: "1", name: "Albin Jaye" },
        { id: "2", name: "Dipika Crescentia" } 
      ],
      playlists: [ 
        { id: "1", user_id: "2", song_ids: [ "1"] },
        { id: "2", user_id: "2", song_ids: [ ] }
      ],
      songs: [
        { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
        { id: "2", artist: "Zedd", title: "The Middle"}
      ]
    }
  })

///////////////////////////////////////////////////////////////////////////////
// addSongToPlaylist
///////////////////////////////////////////////////////////////////////////////
  describe('addSongToPlaylist', function(){
    const { isValid, apply} = addSongToPlaylist
    
    describe('apply', function(){
      it('should update object with change', function(){
        const expected = {
          users: [ 
            { id: "1", name: "Albin Jaye" },
            { id: "2", name: "Dipika Crescentia" } 
          ],
          playlists: [ 
            { id: "1", user_id: "2", song_ids: [ "1", "2"] },
            { id: "2", user_id: "2", song_ids: [ ] }
          ],
          songs: [
            { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
            { id: "2", artist: "Zedd", title: "The Middle"}
          ]
        }
    
        const actual = apply(mixtape, { song: 2, playlist:1 } )
    
        expect(actual).to.deep.equal(expected)
      })
  
      it('should throw error if song does not exist', function(){
        expect(() => apply(mixtape, { song: 100, playlist:1 } )).to.throw()
      })
  
      it('should throw error if playlist does not exist', function(){
        expect(() => apply(mixtape, { song: 1, playlist:100 } )).to.throw()
      })
    })

    describe('validate', function(){
      it('should return true when object is valid', function(){
        const obj = { playlist: 1, song: 3}
    
        const actual = isValid(obj)
    
        expect(actual).to.equal(true)
      })
      it('should return false when the object is not valid', function(){
        const obj = { playlist: 1}
    
        const actual = isValid(obj)
        
        expect(actual).to.equal(false)
      })
    })
  })

///////////////////////////////////////////////////////////////////////////////
// deletePlaylist
///////////////////////////////////////////////////////////////////////////////
  describe('deletePlaylist', function(){
    const { isValid, apply} = deletePlaylist
    
    describe('apply', function(){
      it('should update object with change', function(){
        
        const expected = {
          users: [ 
            { id: "1", name: "Albin Jaye" },
            { id: "2", name: "Dipika Crescentia" } 
          ],
          playlists: [{ id: "2", user_id: "2", song_ids: [ ] }],
          songs: [
            { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
            { id: "2", artist: "Zedd", title: "The Middle"}
          ]
        }
    
        const actual = apply(mixtape, { playlist:1 })
    
        expect(actual).to.deep.equal(expected)
      })
  
  
      it('should throw error if playlist does not exist', function(){
        expect(() => apply(mixtape, { playlist: 1000 })).to.throw()
      })
    })
  
    describe('validate', function(){
      it('should return true when object is valid', function(){
        const obj = { playlist: 1}
  
        const actual = isValid(obj)
  
        expect(actual).to.equal(true)
      })
      it('should return false when the object is not valid', function(){
        const obj = { }
  
        const actual = isValid(obj)
        
        expect(actual).to.equal(false)
      })
    })
  })

///////////////////////////////////////////////////////////////////////////////
// createPlaylistForUser
///////////////////////////////////////////////////////////////////////////////
describe('createPlaylistForUser', function(){
  const { isValid, apply} = createPlaylistForUser
  
  describe('apply', function(){
    it('should update object with change', function(){
      
      const expected = {
        users: [ 
          { id: "1", name: "Albin Jaye" },
          { id: "2", name: "Dipika Crescentia" } 
        ],
        playlists: [ 
          { id: "1", user_id: "2", song_ids: [ "1"] },
          { id: "2", user_id: "2", song_ids: [ ] },
          { id: "3", user_id: "1", song_ids: [ "1", "2"] }
        ],
        songs: [
          { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
          { id: "2", artist: "Zedd", title: "The Middle"}
        ]
      }
  
      const actual = apply(mixtape, { user: 1, songs: [ 1, 2] })
  
      expect(actual).to.deep.equal(expected)
    })

    it('should throw error if user does not exist', function(){
      expect(() => apply(mixtape, { user: 1000, songs: [ 1, 2] })).to.throw()
    })

    it('should throw error if song list is empty', function(){
      expect(() => apply(mixtape, { user: 1000, songs: [ ] })).to.throw()
    })

    it('should throw error if songs do not exist in the playlist', function(){
      expect(() => apply(mixtape, { user: 1000, songs: [ 100, 200] })).to.throw()
    })
  })

  describe('validate', function(){
    it('should return true when object is valid', function(){
      const obj = { user: 1, songs: [ 1, 2] }

      const actual = isValid(obj)

      expect(actual).to.equal(true)
    })
    
    it('should return false when the object is not valid', function(){
      const obj = { songs: [ 1, 2] }

      const actual = isValid(obj)
      
      expect(actual).to.equal(false)
    })
  })
})
})

