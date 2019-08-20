

## Installing and uninstalling the command line tool

The following commands must be run from within the root folder of the command line tool


### To install command line tool
```bash
npm install # this will install dependencies
npm link    # this will add script to path
```

### To uninstall command line tool
```bash
npm unlink  # this will remove script from path
```

### To run tests

```bash
npm test
```

## Running the command line

```bash
killer-app mixtape.json changes.yml output.json
```

There are files located with in the project that can be used. If you run the command from inside project folder, you can use the following parameters

```bash
killer-app files/mixtape.json files/changes.yml files/output.json
```


### Example 1, Add a song to a playlist

#### input.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ 
    { "id": "1", "user_id": "2", "song_ids": [ "1"] }
  ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```

#### changes.yml
```yaml
- addSongToPlaylist:
    song: 2
    playlist: 1
```


#### output.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ 
    { "id": "1", "user_id": "2", "song_ids": [ "1", "2"] }
  ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```

### Example 2, Create a playlist for a user

#### input.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ 
    { "id": "1", "user_id": "2", "song_ids": [ "1"] }
  ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```

#### changes.yml
```yaml
- createPlaylistForUser:
    user: 1
    songs: 
        - 1
        - 2
```


#### output.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ 
    { "id": "1", "user_id": "2", "song_ids": [ "1"] },
    { "id": "2", "user_id": "1", "song_ids": [ "1", "2"] }
  ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```


### Example 3, Deleting a playlist

#### input.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ 
    { "id": "1", "user_id": "2", "song_ids": [ "1"] }
  ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```

#### changes.yml
```yaml
- deletePlaylist: 
    playlist: 1
```


#### output.json
```json
{
  "users": [ 
    { "id": "1", "name": "Albin Jaye" },
    { "id": "2", "name": "Dipika Crescentia" } 
  ],
  "playlists": [ ],
  "songs": [
    { "id": "1", "artist": "Camila Cabello", "title": "Never Be the Same"},
    { "id": "2", "artist": "Zedd", "title": "The Middle"}
  ]
}
```

## Handling very large files
The way I would handle large files would be to stream the file from the hard drive, make sure that the JSON is valid, and create an in memory index of the contents of the file. With the index, the changes can be validated (making sure that playlist, users, and songs exits), and the changes can be aggregated. Then the changes can be applied one after the other by accessing the file at the appropriate points stored in the index that was create.