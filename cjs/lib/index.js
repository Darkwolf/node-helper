class Helper {}
Helper.type = value => typeof value
Helper.tag = value => Object.prototype.toString.call(value)
Helper.keyPath = path => (Array.isArray(path) ? path.join('.') : path).match(/[\w-@#$:]+|\[-?\d+\]/g) || []
Helper.get = (object, path) => Helper.keyPath(path).reduce((obj, key, i, parts) => {
  if (obj && i < parts.length) {
    if (key.length && key.startsWith('[')) {
      const index = parseInt(key.slice(1, -1))
      key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
    }
    return obj[key]
  }
}, object)
Helper.set = (object, path, value) => Helper.keyPath(path).reduce((obj, key, i, parts) => {
  if (key.length && key.startsWith('[')) {
    const index = parseInt(key.slice(1, -1))
    key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
  }
  if (!Helper.isObjectLike(obj[key]) && i < parts.length - 1) {
    const nextKey = parts[i + 1]
    obj[key] = nextKey.length && nextKey.startsWith('[') ? [] : {}
  } else if (i === parts.length - 1) {
    obj[key] = value
    return value
  }
  return obj[key]
}, object)
Helper.has = (object, path) => Helper.keyPath(path).reduce((obj, key, i, parts) => {
  if (key.length && key.startsWith('[')) {
    const index = parseInt(key.slice(1, -1))
    key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
  }
  if (obj && obj.hasOwnProperty(key) && i < parts.length - 1) {
    return obj[key]
  }
  return obj ? obj.hasOwnProperty(key) : false
}, object)
Helper.exists = (value, path) => !Helper.isNil(path ? Helper.get(value, path) : value)
Helper.boolean = value => !!value
Helper.float = value => parseFloat(value)
Helper.integer = value => parseInt(value)
Helper.chunk = (array, size) => array.reduce((arr, value, i) => i % size ? arr : [...arr, array.slice(i, i + size)], [])
Helper.shuffle = array => array.map(value => [Math.random(), value]).sort(([a], [b]) => a - b).map(([random, value]) => value)
Helper.unique = array => [...new Set(array)]
Helper.words = string => string.match(/[A-Za-zА-ЯЁа-яё]?[a-z\dа-яё]+|[A-Z\dА-ЯЁ]+/g) || []
Helper.capitalize = string => string.length ? string[0].toUpperCase() + string.slice(1).toLowerCase() : string
Helper.lowerCase = string => string.toLowerCase()
Helper.upperCase = string => string.toUpperCase()
Helper.camelCase = string => Helper.words(string).reduce((prev, next, i) => prev + (i ? Helper.capitalize(next) : next.toLowerCase()), '')
Helper.pascalCase = string => Helper.words(string).reduce((prev, next) => prev + Helper.capitalize(next), '')
Helper.snakeCase = string => Helper.words(string).join('_').toLowerCase()
Helper.constantCase = string => Helper.words(string).join('_').toUpperCase()
Helper.kebabCase = string => Helper.words(string).join('-').toLowerCase()
Helper.trainCase = string => Helper.words(string).map(Helper.capitalize).join('-')
Helper.dotCase = string => Helper.words(string).map(Helper.lowerCase).join('.')
Helper.normalizeString = value => Helper.exists(value) ? `${value}` : ''
Helper.template = (string, props, options = {}) => {
  const normalize = Helper.isBoolean(options.normalize) ? options.normalize : true
  return string.replace(/{([^{}]+)}/g, (input, name) => {
    let prop = Helper.get(props, name)
    if (Helper.isFunction(prop)) {
      prop = prop()
    }
    return normalize ? Helper.normalizeString(prop) : prop
  })
}
Helper.equal = (value, other) => value === other
Helper.isType = (value, type) => typeof value === type
Helper.isTag = (value, tag) => Helper.tag(value) === tag
Helper.isInstance = (value, constructor) => value instanceof constructor
Helper.isUndefined = value => value === undefined
Helper.isPrimitive = value => (typeof value !== 'object' && typeof value !== 'function') || value === null
Helper.isNull = value => value === null
Helper.isNil = value => value == null
Helper.isObject = value => typeof value === 'object' && value !== null
Helper.isObjectLike = value => (typeof value === 'object' || typeof value === 'function') && value !== null
Helper.isPlainObject = value => Helper.isTag(value, '[object Object]')
Helper.isFunction = value => typeof value === 'function'
Helper.isAsyncFunction = value => Helper.isTag(value, '[object AsyncFunction]')
Helper.isBoolean = value => typeof value === 'boolean' || value instanceof Boolean
Helper.isNumber = value => typeof value === 'number' || value instanceof Number
Helper.isString = value => typeof value === 'string' || value instanceof String
Helper.isSymbol = value => typeof value === 'symbol'
Helper.isArray = value => Array.isArray(value)
Helper.isBuffer = value => Buffer.isBuffer(value)
Helper.isTypedArray = value => value instanceof TypedArray
Helper.isRegExp = value => value instanceof RegExp
Helper.isSet = value => value instanceof Set
Helper.isMap = value => value instanceof Map
Helper.isWeakSet = value => value instanceof WeakSet
Helper.isWeakMap = value => value instanceof WeakMap
Helper.isPromise = value => value instanceof Promise
Helper.isDate = value => value instanceof Date
Helper.isError = value => value instanceof Error
Helper.isFinite = value => Number.isFinite(value)
Helper.isFloat = value => Number.isFinite(value)
Helper.isInteger = value => Number.isInteger(value)
Helper.isSafeInteger = value => Number.isSafeInteger(value)
Helper.isNaN = value => Number.isNaN(value)
Helper.isInfinity = value => Math.abs(value) === Infinity
Helper.isDecimal = value => Number.isFinite(value) && !!(value % 1)
Helper.isPositive = value => value > 0
Helper.isNegative = value => value < 0
Helper.isNonNegative = value => value >= 0
Helper.isNonPositive = value => value <= 0
Helper.isNatural = value => Number.isInteger(value) && value > 0
Helper.isWhole = value => Number.isInteger(value) && value >= 0
Helper.isEmpty = value => !value.length
Helper.isJSON = value => {
  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}
Helper.isASCII = value => /^[ -~]+$/.test(value)
Helper.isBase64 = value => /^(?:[A-Za-z\d+/]{4}|(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)|(?:[A-Za-z\d+/]{4})+(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?)$/.test(value)

module.exports = Helper
