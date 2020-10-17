
export default class Emitter {
  eventMap: Map<string, Array<Function>>;
  constructor () {
    this.eventMap = new Map()
  }

  on (key: string, cb: Function) {
    let handlers = this.eventMap.get(key)
    if (!handlers) {
      handlers = []
    }
    handlers.push(cb)
    this.eventMap.set(key, handlers)
  }

  off (key: string, cb?: Function) {
    const handlers = this.eventMap.get(key)
    if (!handlers) return
    if (cb) {
      const idx = handlers.indexOf(cb)
      idx > -1 && handlers.splice(idx, 1)
      this.eventMap.set(key, handlers)
    } else {
      this.eventMap.delete(key)
    }
  }

  once (key: string, cb: Function) {
    const handlers = [(payload?: any) => {
      cb(payload)
      this.off(key)
    }]
    this.eventMap.set(key, handlers)
  }

  emit (key: string, payload?: any) {
    const handlers = this.eventMap.get(key)
    if (!Array.isArray(handlers)) return
    handlers.forEach(handler => {
      handler(payload)
    })
  }
}
