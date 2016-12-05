class Mapper {
  constructor (stream) {
    this.stream = stream
    this.observe()
  }

  observe () {
    const onNext = json => this.map(json)
    const onError = err => console.error(err)
    const onCompleted = () => console.log('Stream completed')

    this.observer = this.stream.subscribe(onNext, onError, onCompleted)
    return this.observer
  }

  map (json) {
    console.log('onNext called with argument: ', json)
    return {
      date: Date.now(),
      stands: json.values
    }
  }
}

module.exports = Mapper
