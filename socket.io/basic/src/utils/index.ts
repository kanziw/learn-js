import Promise from 'bluebird'

export function delay(ms: number): Promise<void> {
  return Promise.delay(ms)
}
