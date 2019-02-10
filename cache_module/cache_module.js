// Here relays the cache module (memory)

class DataCache {
  constructor() {
    // Cache elements
    // date = on miliseconds
    // url = url from where is the cache
    // data = data of the cache
    this._cache = [];

    this._cacheTime = 400000; // 40 in miliseconds
  }

  addToCache(url, data) {
    // Add an element into the cache
    this._cache.push({
      date: Date.now(),
      url: url,
      data: data
    });
    console.log('Element added into cache!');
  }

  delFromCache(url) {
    // Delete element from the cache
    return this._cache.filter((element) => element.url != url);
  }

  searchCache(url) {
    // Returns the data of an element by url
    // First we check the cache
    this.checkCacheTime();

    // Then we search on the cache
    for (let i = 0; i < this._cache.length; i++) {
      if (this._cache[i].url == url) {
        // if it's on cache, return the element
        console.log('Cache data found for that URL!');
        return this._cache[i];
      }
    }

  }

  checkCacheTime() {
    // Check and cleans the cache by date
    let now = Date.now();
    this._cache = this._cache.filter((element, index) => {
      return element.date < (now + this._cacheTime);
    });
  }
}

module.exports = DataCache;
