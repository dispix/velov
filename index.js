const Watcher = require('./src/Watcher')
const Mapper = require('./src/Mapper')

const watcher = new Watcher('https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json', 5000)
const mapper = new Mapper(watcher.watch())

console.log('Starting...')
