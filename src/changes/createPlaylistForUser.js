const {
  checkKeysAndValues, isArrayOfNumbers, isNumber
} = require('../utils')


const keysRequired = [
  { key: 'user', validation: isNumber },
  { key: 'songs', validation: isArrayOfNumbers }
]

const apply = (mixtape, { user: userId, songs }) => {
  // get user, throw error if it does not exist
  const user = mixtape.users.find(user => user.id === String(userId))
  if(!user) throw new Error(`User ${userId} does not exist`)

  // checks to see if playlist is empty, if it is throw error
  if(songs.length < 1) throw new Error(`Song list for play list is empty, it cannot be created`)

  // check to see if all the songs exist before they are added to playlist
  const allSongsExists = songs.every(song => mixtape.songs.find(s => s.id === String(song)))

  if(!allSongsExists) throw new Error('Some songs in the song list do not exists in the mixtape')



  // create new playlist
  const newPlayList = {
    id: String(mixtape.playlists.length + 1), // There is a bug with the numbering, it should look at the id of the last playlist, not the length of the array
    user_id: String(userId),
    song_ids : songs.map(s => String(s))
  }
  
  // add new playlist to playlists
  mixtape.playlists.push(newPlayList)

  return mixtape
}


module.exports = {
  isValid: checkKeysAndValues(keysRequired),
  apply
}