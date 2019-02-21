interface IIdentity {
  id: number
}

class HyperArray<T extends IIdentity> {
  constructor(protected arr: T[]) {}

  push(...items: T[]) {
    return this.arr.push(...items)
  }

  set(item: T) {
    const index = this.arr.findIndex((e) => e.id === item.id)
    if (index !== -1) {
      this.arr[index] = item
    }
  }

  remove(item: T) {
    const index = this.arr.findIndex((e) => e.id === item.id)
    if (index !== -1) {
      this.arr.splice(index, 1)
    }
  }
}

export default HyperArray
