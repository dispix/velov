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
    *  @return {Object}              Observable stream
   */
  createStream () {
    return Rx.Observable.interval(this.interval)
      .mergeMap(() => Rx.Observable.fromPromise(fetch(this.url)))
      // Creates a new Observable stream from the response
      .mergeMap(res => res.ok ? Rx.Observable.fromPromise(res.json()) : Rx.Observable.throw(new Error(res)))
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
