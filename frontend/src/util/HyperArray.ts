interface IIdentity {
  id: number
}

class HyperArray<T extends IIdentity> extends Array<T> {
  constructor(private arr: T[]) {
    super()
  }

  upsert(t: T) {
    const index = this.arr.findIndex((e) => e.id === t.id)
    if (index !== -1) {
      this.arr[index] = t
    } else {
      this.arr.push(t)
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
