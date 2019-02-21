import { IObservable } from 'mobx'

const safeSet = (current: any, next?: any) =>
  next !== undefined ? next : current

function logMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target, propertyKey, descriptor)
}

export { safeSet }
