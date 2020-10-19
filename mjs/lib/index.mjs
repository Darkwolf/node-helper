export default class Helper {
  static type(value) {
    return typeof value
  }

  static tag(value) {
    return Object.prototype.toString.call(value)
  }

  static keyPath(path) {
    return (Array.isArray(path) ? path.join('.') : path).match(/[\w-@#$:]+|\[-?\d+\]/g) || []
  }

  static get(object, path) {
    return Helper.keyPath(path).reduce((obj, key, i, parts) => {
      if (obj && i < parts.length) {
        if (key.length && key.startsWith('[')) {
          const index = parseInt(key.slice(1, -1))
          key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
        }
        return obj[key]
      }
    }, object)
  }

  static set(object, path, value) {
    return Helper.keyPath(path).reduce((obj, key, i, parts) => {
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
  }

  static has(object, path) {
    return Helper.keyPath(path).reduce((obj, key, i, parts) => {
      if (key.length && key.startsWith('[')) {
        const index = parseInt(key.slice(1, -1))
        key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
      }
      if (obj && obj.hasOwnProperty(key) && i < parts.length - 1) {
        return obj[key]
      }
      return obj ? obj.hasOwnProperty(key) : false
    }, object)
  }

  static exists(value, path) {
    return !Helper.isNil(path ? Helper.get(value, path) : value)
  }

  static boolean(value) {
    return !!value
  }

  static float(value) {
    return parseFloat(value)
  }

  static integer(value) {
    return parseInt(value)
  }

  static string(value) {
    return Helper.exists(value) ? `${value}` : ''
  }

  static chunk(array, size) {
    return array.reduce((arr, value, i) => i % size ? arr : [...arr, array.slice(i, i + size)], [])
  }

  static shuffle(array) {
    return array.map(value => [Math.random(), value]).sort(([a], [b]) => a - b).map(([random, value]) => value)
  }

  static unique(array) {
    return [...new Set(array)]
  }

  static words(string) {
    return string.match(/[A-Za-zА-ЯЁа-яё]?[a-z\dа-яё]+|[A-Z\dА-ЯЁ]+/g) || []
  }

  static capitalize(string) {
    return string.length ? string[0].toUpperCase() + string.slice(1).toLowerCase() : string
  }

  static lowerCase(string) {
    return string.toLowerCase()
  }

  static upperCase(string) {
    return string.toUpperCase()
  }

  static camelCase(string) {
    return Helper.words(string).reduce((prev, next, i) => prev + (i ? Helper.capitalize(next) : next.toLowerCase()), '')
  }

  static pascalCase(string) {
    return Helper.words(string).reduce((prev, next) => prev + Helper.capitalize(next), '')
  }

  static snakeCase(string) {
    return Helper.words(string).join('_').toLowerCase()
  }

  static constantCase(string) {
    return Helper.words(string).join('_').toUpperCase()
  }

  static kebabCase(string) {
    return Helper.words(string).join('-').toLowerCase()
  }

  static trainCase(string) {
    return Helper.words(string).map(Helper.capitalize).join('-')
  }

  static dotCase(string) {
    return Helper.words(string).map(Helper.lowerCase).join('.')
  }

  static template(string, props, options = {}) {
    const normalize = Helper.isBoolean(options.normalize) ? options.normalize : true
    return string.replace(/{([^{}]+)}/g, (input, name) => {
      let prop = Helper.get(props, name)
      if (Helper.isFunction(prop)) {
        prop = prop()
      }
      return normalize ? Helper.string(prop) : prop
    })
  }

  static equals(value, other) {
    return value === other
  }

  static isType(value, type) {
    return typeof value === type
  }

  static isTag(value, tag) {
    return Helper.tag(value) === tag
  }

  static isInstance(value, constructor) {
    return value instanceof constructor
  }

  static isUndefined(value) {
    return value === undefined
  }

  static isPrimitive(value) {
    return (typeof value !== 'object' && typeof value !== 'function') || value === null
  }

  static isNull(value) {
    return value === null
  }

  static isNil(value) {
    return value == null
  }

  static isObject(value) {
    return typeof value === 'object' && value !== null
  }

  static isObjectLike(value) {
    return (typeof value === 'object' || typeof value === 'function') && value !== null
  }

  static isPlainObject(value) {
    return Helper.isTag(value, '[object Object]')
  }

  static isFunction(value) {
    return typeof value === 'function'
  }

  static isAsyncFunction(value) {
    return Helper.isTag(value, '[object AsyncFunction]')
  }

  static isBoolean(value) {
    return typeof value === 'boolean' || value instanceof Boolean
  }

  static isNumber(value) {
    return typeof value === 'number' || value instanceof Number
  }

  static isString(value) {
    return typeof value === 'string' || value instanceof String
  }

  static isSymbol(value) {
    return typeof value === 'symbol'
  }

  static isArray(value) {
    return Array.isArray(value)
  }

  static isBuffer(value) {
    return Buffer.isBuffer(value)
  }

  static isTypedArray(value) {
    return value instanceof TypedArray
  }

  static isRegExp(value) {
    return value instanceof RegExp
  }

  static isSet(value) {
    return value instanceof Set
  }

  static isMap(value) {
    return value instanceof Map
  }

  static isWeakSet(value) {
    return value instanceof WeakSet
  }

  static isWeakMap(value) {
    return value instanceof WeakMap
  }

  static isPromise(value) {
    return value instanceof Promise
  }

  static isDate(value) {
    return value instanceof Date
  }

  static isError(value) {
    return value instanceof Error
  }

  static isFinite(value) {
    return Number.isFinite(value)
  }

  static isFloat(value) {
    return Number.isFinite(value)
  }

  static isInteger(value) {
    return Number.isInteger(value)
  }

  static isSafeInteger(value) {
    return Number.isSafeInteger(value)
  }

  static isNaN(value) {
    return Number.isNaN(value)
  }

  static isInfinity(value) {
    return Math.abs(value) === Infinity
  }

  static isDecimal(value) {
    return Number.isFinite(value) && !!(value % 1)
  }

  static isPositive(value) {
    return value > 0
  }

  static isNegative(value) {
    return value < 0
  }

  static isNonNegative(value) {
    return value >= 0
  }

  static isNonPositive(value) {
    return value <= 0
  }

  static isNatural(value) {
    return Number.isInteger(value) && value > 0
  }

  static isWhole(value) {
    return Number.isInteger(value) && value >= 0
  }

  static isEmpty(value) {
    return !value.length
  }

  static isJSON(value) {
    try {
      JSON.parse(value)
      return true
    } catch (e) {
      return false
    }
  }

  static isASCII(value) {
    return /^[ -~]+$/.test(value)
  }

  static isBase64(value) {
    return /^(?:[A-Za-z\d+/]{4}|(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)|(?:[A-Za-z\d+/]{4})+(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?)$/.test(value)
  }
}
