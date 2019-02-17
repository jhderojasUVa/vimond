// Here relays the cache module (file system)

const fs = require('fs');

class DataCache {
  constructor() {
    // Cache constructor
    // We only need an internal cache time

    // If I was smart I will put the "cache time" in miliseconds on the constructor...
    // only if I was smart... it will be like
    /*
    constructor(time) {
    this._cacheTime = time;
    }
    */

    this._cacheTime = 400000; // 40 in miliseconds
  }

  addToCache(url, data) {
    // Add an element into the cache

    // First we change the url to something that the file system will use better
    // and add the "cache extension" :)
    let fileUrl = Date.now() + '_' + url.replace('/', '-') + '.cache';

    // Let's save the file
    fs.write(__dirname + '/cache/' + fileUrl, data, (error) => {
      if (error) {
        console.log('There was an error saving the cache file: ' + error);
      }
    });

    console.log('Element added into cache!');
  }

  delFromCache(url) {
    // Delete element from the cache
    return this._cache.filter((element) => element.url != url);
  }

  searchCache(url) {
    // Returns the data of an element by url
    // First we check the cache that deletes old cache files
    this.checkCacheTime();

    // Then we search on the cache
    // We see all the files in the directory
    fs.readdir(__dirname + '/cache/', (error, files) => {
      files.forEach((file) => {
        // See if the name-url it's the same
        let filetmp = file.split('_');
        if (filetmp[1].replace('-', '/') == url + '.cache') { // We add the .cache or will never find the file!
          // Here there's two ways, sync or async.. allways it's better on
          // async but you can decide
          // Sync
          //return fs.readFileSync(file, 'utf8');
          // Async
          return fs.readFile(file, 'utf8', (error, content) => {
            return content;
          });
        }
      });
    });
    // If not found..
    return undefined;
  }

  checkCacheTime() {
    // Check and cleans the cache by date
    let now = Date.now();

    // Let's walk through the directory in order to delete old cache files
    fs.readdir(__dirname + '/cache/', (error, files) => {
      // For every file
      files.forEach((file) => {
        // If it's old...
        if (parseInt(filetmp[0]) > parseInt(now + this._cacheTime)) {
          // We must delete the file
          fs.unlink(__dirname + '/cache/' + file, (error) => {
            if (error) {
              console.log('There was an error deleting cache file: ' + error);
            }
          });
        }
      });
    });
  }
}

module.exports = DataCache;
