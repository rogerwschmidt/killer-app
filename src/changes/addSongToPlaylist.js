const {
  checkKeysAndValues, isNumber
} = require('../utils')


const keysRequired = [
  { key: 'song', validation: isNumber },
  { key: 'playlist', validation: isNumber },
]

const apply = (mixtape, { song: songId, playlist: playlistId }) => {
  
  // get song, throw error if it does not exists
  const song = mixtape.songs.find(song => song.id === String(songId))
  if(!song) throw new Error(`Song ${songId} does not exist`)
  
  // get playlist, throw error if it does not exist
  const playList = mixtape.playlists.find(playlist => playlist.id === String(playlistId))
  if(!playList) throw new Error(`Playlist ${playList} does not exist`)

  // add song to playlist
  playList.song_ids.push(songId.toString())

  return mixtape
}

module.exports = {
  isValid: checkKeysAndValues(keysRequired),
  apply
}