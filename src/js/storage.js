'use strict';

function playlistKey(userId, playlistLid) {
  return JSON.stringify(['playlist', userId, playlistLid]);
}

function isPlaylistKey(key) {
  return key.startsWith('["playlist');
}

exports.getPlaylist = function getPlaylist(userId, playlistLid, callback) {
  const key = playlistKey(userId, playlistLid);

  chrome.storage.sync.get(key, items => {
    const playlist = items[key];
    callback(playlist);
  });
};

exports.savePlaylist = function savePlaylist(playlist, callback) {
  const storageItems = {};
  storageItems[playlistKey(playlist.userId, playlist.localId)] = playlist;

  chrome.storage.sync.set(storageItems, () => {
    callback();
  });
};

exports.deletePlaylist = function deletePlaylist(userId, playlistLid, callback) {
  chrome.storage.sync.remove(playlistKey(userId, playlistLid), () => {
    callback();
  });
};

exports.addPlaylistChangeListener = function addPlaylistChangeListener(callback) {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      for (const key in changes) {
        if (isPlaylistKey(key)) {
          callback(changes[key]);
        }
      }
    }
  });
};

exports.getPlaylistsForUser = function getPlaylistsForUser(userId, callback) {
  chrome.storage.sync.get(null, items => {
    const playlists = [];
    for (const key in items) {
      const parsedKey = JSON.parse(key);
      if (parsedKey[0] === 'playlist' && parsedKey[1] === userId) {
        playlists.push(items[key]);
      }
    }

    callback(playlists);
  });
};

exports.importPlaylistsForUser = function importPlaylistsForUser(userId, playlists, callback) {
  exports.getPlaylistsForUser(userId, currentPlaylists => {
    // FIXME we should wait on all callbacks before calling back.
    for (let i = 0; i < currentPlaylists.length; i++) {
      exports.deletePlaylist(userId, currentPlaylists[i].localId, () => {});
    }

    for (let i = 0; i < playlists.length; i++) {
      console.log('saving', playlists[i]);
      if (i === playlists.length - 1) {
        exports.savePlaylist(playlists[i], callback);
      } else {
        exports.savePlaylist(playlists[i], () => {});
      }
    }
  });
};
