import Rx from 'rx'
import firebase from 'firebase'

import Watcher from './Watcher'

class Inspector {
  constructor (config, url) {
    firebase.initializeApp(config)
    this.velovUrl = url
  }

  createWatcher (url) {

  }

  watch () {

  }
}

export default Inspector
