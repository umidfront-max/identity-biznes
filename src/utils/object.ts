type ObjectValue = Record<string, unknown>
type KeyType = string | ((obj: ObjectValue) => unknown)

export const getValueFromGivenObjectByKey = (object: ObjectValue, key: KeyType, onNotFoundValueMsg: unknown = '—'): unknown => {
  if (typeof key === 'function') return key(object)

  const keys = key.split('.')
  let value: any = object

  for (let i = 0; i < keys.length; i++) {
    if (value[keys[i]] === undefined || value[keys[i]] === null) return onNotFoundValueMsg

    value = value[keys[i]]
  }

  return value
}

export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
