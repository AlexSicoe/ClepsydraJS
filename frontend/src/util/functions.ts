const safeSet = (next: any, current: any) =>
  next !== undefined ? next : current

export { safeSet }
