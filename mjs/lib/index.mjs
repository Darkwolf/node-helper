export default class Helper {
  static typeOf(value) {
    return typeof value
  }

  static tagOf(value) {
    return Object.prototype.toString.call(value)
  }

  static toPath(path) {
    return (Array.isArray(path) ? path.join('.') : path).match(/[\w-@#$:]+|\[-?\d+\]/g) || []
  }

  static get(object, path) {
    return Helper.toPath(path).reduce((obj, key, i, path) => {
      if (obj && i < path.length) {
        if (key.length && key.startsWith('[')) {
          const index = parseInt(key.slice(1, -1))
          key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
        }
        return obj[key]
      }
    }, object)
  }

  static set(object, path, value) {
    return Helper.toPath(path).reduce((obj, key, i, path) => {
      if (key.length && key.startsWith('[')) {
        const index = parseInt(key.slice(1, -1))
        key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
      }
      if (!Helper.isObjectLike(obj[key]) && i < path.length - 1) {
        const nextKey = path[i + 1]
        obj[key] = nextKey.length && nextKey.startsWith('[') ? [] : {}
      } else if (i === path.length - 1) {
        obj[key] = value
        return value
      }
      return obj[key]
    }, object)
  }

  static has(object, path) {
    return Helper.toPath(path).reduce((obj, key, i, path) => {
      if (key.length && key.startsWith('[')) {
        const index = parseInt(key.slice(1, -1))
        key = Array.isArray(obj) && index < 0 ? Math.max(0, obj.length + index) : index
      }
      if (obj && obj.hasOwnProperty(key) && i < path.length - 1) {
        return obj[key]
      }
      return obj ? obj.hasOwnProperty(key) : false
    }, object)
  }

  static exists(value, path) {
    return !Helper.isNil(path ? Helper.get(value, path) : value)
  }

  static toBoolean(value) {
    return !!value
  }

  static toNumber(value) {
    return Number(value)
  }

  static toFinite(value) {
    const number = Number(value)
    return Number.isNaN(number) ? 0 : number === Infinity ? Number.MAX_VALUE : number === -Infinity ? -Number.MAX_VALUE : number
  }

  static toFloat(value) {
    return Helper.toFinite(value)
  }

  static toInteger(value) {
    const number = Number(value)
    return Number.isNaN(number) ? 0 : number === Infinity ? Number.MAX_VALUE : number === -Infinity ? -Number.MAX_VALUE : parseInt(number)
  }

  static toSafeInteger(value) {
    const number = Number(value)
    return Number.isNaN(number) ? 0 : Math.max(Math.min(value, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
  }

  static toString(value) {
    return Helper.exists(value) ? `${value}` : ''
  }

  static now() {
    return Date.now()
  }

  static unix(options = {}) {
    const timestamp = Date.now() / 1000
    return options.millis ? timestamp : Math.floor(timestamp)
  }

  static chunk(array, size = 1) {
    return array.reduce((arr, value, i) => i % size ? arr : [...arr, array.slice(i, i + size)], [])
  }

  static shuffle(array) {
    return array.map(value => [Math.random(), value]).sort(([a], [b]) => a - b).map(([random, value]) => value)
  }

  static uniq(array) {
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
      return normalize ? Helper.toString(prop) : prop
    })
  }

  static padStart(string, targetLength, padString) {
    return string.padStart(targetLength, padString)
  }

  static padEnd(string, targetLength, padString) {
    return string.padEnd(targetLength, padString)
  }

  static repeat(string, count) {
    return string.repeat(count)
  }

  static replace(string, regex, replacer) {
    return string.replace(regex, replacer)
  }

  static replaceAll(string, regex, replacer) {
    return string.replaceAll(regex, replacer)
  }

  static slice(input, startIndex, endIndex) {
    return input.slice(startIndex, endIndex)
  }

  static substring(string, startIndex, beforeIndex) {
    return string.substring(startIndex, beforeIndex)
  }

  static trim(string) {
    return string.trim()
  }

  static indexOf(input, searchValue, fromIndex) {
    return input.indexOf(searchValue, fromIndex)
  }

  static lastIndexOf(input, searchValue, fromIndex) {
    return input.lastIndexOf(searchValue, fromIndex)
  }

  static match(string, regex) {
    return string.match(regex)
  }

  static matchAll(string, regex) {
    return string.matchAll(regex)
  }

  static search(string, regex) {
    return string.search(regex)
  }

  static split(string, separator, limit) {
    return string.split(separator, limit)
  }

  static equals(value, other) {
    return value === other
  }

  static startsWith(string, searchValue, position) {
    return string.startsWith(searchValue, position)
  }

  static endsWith(string, searchValue, length) {
    return string.endsWith(searchValue, length)
  }

  static includes(input, searchValue, fromIndex) {
    return input.includes(searchValue, fromIndex)
  }

  static isType(value, type) {
    return typeof value === type
  }

  static isTag(value, tag) {
    return Helper.tagOf(value) === tag
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

  static isIPv4(value) {
    return /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(value)
  }

  static isIPv6(value) {
    return /^(?:(?:::(?:[A-Fa-f\d]{1,4}:){0,5}|[A-Fa-f\d]{1,4}::(?:[A-Fa-f\d]{1,4}:){0,4}|(?:[A-Fa-f\d]{1,4}:){2}:(?:[A-Fa-f\d]{1,4}:){0,3}|(?:[A-Fa-f\d]{1,4}:){3}:(?:[A-Fa-f\d]{1,4}:){0,2}|(?:[A-Fa-f\d]{1,4}:){4}:(?:[A-Fa-f\d]{1,4}:)?|(?:[A-Fa-f\d]{1,4}:){5}:|(?:[A-Fa-f\d]{1,4}:){6})(?<ipv4>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|:(?::|(?::[A-Fa-f\d]{1,4}){1,7})|[A-Fa-f\d]{1,4}:(?::|(?::[A-Fa-f\d]{1,4}){1,6})|(?:[A-Fa-f\d]{1,4}:){2}(?::|(?::[A-Fa-f\d]{1,4}){1,5})|(?:[A-Fa-f\d]{1,4}:){3}(?::|(?::[A-Fa-f\d]{1,4}){1,4})|(?:[A-Fa-f\d]{1,4}:){4}(?::|(?::[A-Fa-f\d]{1,4}){1,3})|(?:[A-Fa-f\d]{1,4}:){5}(?::|(?::[A-Fa-f\d]{1,4}){1,2})|(?:[A-Fa-f\d]{1,4}:){6}(?::|(?::[A-Fa-f\d]{1,4}))|(?:[A-Fa-f\d]{1,4}:){7}:|(?:[A-Fa-f\d]{1,4}:){7}[A-Fa-f\d]{1,4})$/.test(value)
  }

  static isURL(value) {
    return /^(?<origin>(?<protocol>https?):\/\/(?<host>(?<hostname>(?<domain>(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])*)\.)+(?:[a-z]{2,}))|(?<ip>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|\[(?<ipv6>(?:::(?:[A-Fa-f\d]{1,4}:){0,5}|[A-Fa-f\d]{1,4}::(?:[A-Fa-f\d]{1,4}:){0,4}|(?:[A-Fa-f\d]{1,4}:){2}:(?:[A-Fa-f\d]{1,4}:){0,3}|(?:[A-Fa-f\d]{1,4}:){3}:(?:[A-Fa-f\d]{1,4}:){0,2}|(?:[A-Fa-f\d]{1,4}:){4}:(?:[A-Fa-f\d]{1,4}:)?|(?:[A-Fa-f\d]{1,4}:){5}:|(?:[A-Fa-f\d]{1,4}:){6})(?<ipv4>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|:(?::|(?::[A-Fa-f\d]{1,4}){1,7})|[A-Fa-f\d]{1,4}:(?::|(?::[A-Fa-f\d]{1,4}){1,6})|(?:[A-Fa-f\d]{1,4}:){2}(?::|(?::[A-Fa-f\d]{1,4}){1,5})|(?:[A-Fa-f\d]{1,4}:){3}(?::|(?::[A-Fa-f\d]{1,4}){1,4})|(?:[A-Fa-f\d]{1,4}:){4}(?::|(?::[A-Fa-f\d]{1,4}){1,3})|(?:[A-Fa-f\d]{1,4}:){5}(?::|(?::[A-Fa-f\d]{1,4}){1,2})|(?:[A-Fa-f\d]{1,4}:){6}(?::|(?::[A-Fa-f\d]{1,4}))|(?:[A-Fa-f\d]{1,4}:){7}:|(?:[A-Fa-f\d]{1,4}:){7}[A-Fa-f\d]{1,4})\])(:(?<port>[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d{1}|6553[0-5]))?))(?<path>(?<pathname>(?:\/[\w-.%+@&:~]*)*)(?<search>\?(?<query>[\w-.%+@&=:;,~]*))?(?<fragment>#(?<hash>[\w-]*))?)$/.test(value)
  }

  static isUUID(value) {
    return /^[A-Fa-f\d]{8}-(?:[A-Fa-f\d]{4}-){3}[A-Fa-f\d]{12}$/.test(value)
  }
}
