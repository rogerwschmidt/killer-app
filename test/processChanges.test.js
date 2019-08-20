const { expect } = require('chai')

const { processChanges } = require('../src/process/index')

describe('processChanges', function(){
  let mixtape = {}
  beforeEach(function(){
    mixtape = {
      users: [ 
        { id: "1", name: "Albin Jaye" },
        { id: "2", name: "Dipika Crescentia" } 
      ],
      playlists: [ { id: "1", user_id: "2", song_ids: [ "1"] }],
      songs: [
        { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
        { id: "2", artist: "Zedd", title: "The Middle"}
      ]
    }
  })

  it('should add a song to a playlist', function(){
    const changes = [
      { addSongToPlaylist: { song: 2, playlist: 1}}
    ]
    
    const expected = {
      users: [ 
        { id: "1", name: "Albin Jaye" },
        { id: "2", name: "Dipika Crescentia" } 
      ],
      playlists: [ { id: "1", user_id: "2", song_ids: [ "1", "2"] }],
      songs: [
        { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
        { id: "2", artist: "Zedd", title: "The Middle"}
      ]
    }
    
    const actual = processChanges([mixtape, changes])
    expect(actual).to.deep.equal(expected)
  })

  it('should add playlist to a user', function(){
    const changes = [
      { createPlaylistForUser: { user: 1, songs: [1, 2]}}
    ]
    
    const expected = {
      users: [ 
        { id: "1", name: "Albin Jaye" },
        { id: "2", name: "Dipika Crescentia" } 
      ],
      playlists: [ 
        { id: "1", user_id: "2", song_ids: [ "1"] }, 
        { id: "2", user_id: "1", song_ids: [ "1", "2"] }
      ],
      songs: [
        { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
        { id: "2", artist: "Zedd", title: "The Middle"}
      ]
    }
    
    const actual = processChanges([mixtape, changes])
    expect(actual).to.deep.equal(expected)
  })

  it('should do all three', function(){
    const changes = [
      { addSongToPlaylist: { song: 2, playlist: 1}},
      { createPlaylistForUser: { user: 1, songs: [1, 2]}},
      { deletePlaylist: { playlist: 1}}
    ]
    
    const expected = {
      users: [ 
        { id: "1", name: "Albin Jaye" },
        { id: "2", name: "Dipika Crescentia" } 
      ],
      playlists: [
        { id: "2", user_id: "1", song_ids: [ "1", "2"] }
      ],
      songs: [
        { id: "1", artist: "Camila Cabello", title: "Never Be the Same"},
        { id: "2", artist: "Zedd", title: "The Middle"}
      ]
    }
    
    const actual = processChanges([mixtape, changes])
    expect(actual).to.deep.equal(expected)
  })

  it('should do a combinations of changes', function(){
    const changes = [
      { deletePlaylist: { playlist: 1}}
    ]
  })
})