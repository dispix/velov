const timers = require('timers')
const Rx = require('rx')
const fetch = require('isomorphic-fetch')

/**
 *  The Watcher class provides a stream of GET calls to a given URL
 */
class Watcher {
  /**
   *  Set-up the class with the watched URL and a given interval
   *  @method constructor
   *  @param  {String}  url         The URL to fetch
   *  @param  {Number}  interval    Time interval in ms
   *  @return {Object}              A new Watcher
   */
  constructor (url, interval) {
    this.url = url
    this.interval = interval
  }

  /**
    *  Create a new Rx Observable that fetch [url] every [interval] and streams the resolved/rejected promise
    *  @method createStream
    *  @param  {String}  url         The URL to fetch
    *  @param  {Number}  interval    Time interval in ms
    *  @return {Object}              Observable stream
   */
  createStream (url, interval) {
    return Rx.Observable.create(observer => {
      const interval = timers.setInterval(() => {
        fetch(this.url)
          .then(res => res.json())
          .then(json => observer.onNext(json))
          .catch(err => observer.onError(err))
      }, this.interval)

      return () => clearInterval(interval)
    })
  }

  /**
    *  Start the Observable
    *  @method watch
    *  @return {Object}   Observable stream
   */
  watch () {
    this.stream = this.createStream()

    return this.stream
  }
}

module.exports = Watcher
