interface IIdentity {
  id: number
}

class HyperArray<T extends IIdentity> extends Array<T> {
  constructor(private arr: T[]) {
    super()
  }

  add(t: T) {
    this.arr.push(t)
  }

  set(t: T) {
    const index = this.arr.findIndex((e) => e.id === t.id)
    if (index !== -1) {
      this.arr[index] = t
    }
  }

  remove(t: T) {
    const index = this.arr.findIndex((e) => e.id === t.id)
    if (index !== -1) {
      this.arr.splice(index, 1)
    }
  }
}

export default HyperArray
