export default class Helper {
  static typeOf(value) {
    return typeof value
  }

  static tagOf(value) {
    return Object.prototype.toString.call(value)
  }

  static hasOwnProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  static get(object, path, defaultValue) {
    let result
    if (Helper.isObjectLike(object)) {
      path = Helper.toPath(path)
      if (path.length) {
        let obj = object
        let i = 0
        for (const key of path) {
          const prop = obj[key]
          if (i < path.length - 1) {
            if (Helper.isObjectLike(prop)) {
              obj = prop
            } else {
              obj = undefined
              break
            }
          } else {
            obj = prop
          }
          i++
        }
        result = obj
      }
    }
    return result === undefined ? defaultValue : result
  }

  static set(object, path, value) {
    if (Helper.isObjectLike(object)) {
      path = Helper.toPath(path)
      if (path.length) {
        let obj = object
        let i = 0
        for (const key of path) {
          if (i < path.length - 1) {
            const prop = obj[key]
            if (Helper.isObjectLike(prop)) {
              obj = prop
            } else {
              const nextKey = path[i + 1]
              obj[key] = Helper.isIndex(nextKey) ? [] : {}
              obj = obj[key]
            }
          } else {
            obj[key] = value
          }
          i++
        }
      }
    }
    return object
  }

  static delete(object, path) {
    if (Helper.isObjectLike(object)) {
      path = Helper.toPath(path)
      if (path.length) {
        let obj = object
        let i = 0
        for (const key of path) {
          if (i < path.length - 1) {
            const prop = obj[key]
            if (Helper.isObjectLike(prop)) {
              obj = prop
            } else {
              return false
            }
          } else {
            return delete obj[key]
          }
          i++
        }
      }
    }
    return false
  }

  static has(object, path) {
    if (Helper.isObjectLike(object)) {
      path = Helper.toPath(path)
      if (path.length) {
        let obj = object
        let i = 0
        for (const key of path) {
          if (i < path.length - 1) {
            const prop = obj[key]
            if (Helper.isObjectLike(prop)) {
              obj = prop
            } else {
              return false
            }
          } else {
            return Helper.hasOwnProperty(obj, key)
          }
          i++
        }
      }
    }
    return false
  }

  static hasIn(object, path) {
    if (Helper.isObjectLike(object)) {
      path = Helper.toPath(path)
      if (path.length) {
        let obj = object
        let i = 0
        for (const key of path) {
          if (i < path.length - 1) {
            const prop = obj[key]
            if (Helper.isObjectLike(prop)) {
              obj = prop
            } else {
              return false
            }
          } else {
            return key in obj
          }
          i++
        }
      }
    }
    return false
  }

  static exists(value) {
    return !Helper.isNil(value)
  }

  static existsIn(object, path) {
    return Helper.exists(Helper.get(object, path))
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

  static toKey(value) {
    return Helper.isSymbol(value) ? value : `${value}`
  }

  static stringToPath(string) {
    const path = []
    if (string.startsWith('.')) {
      path.push('')
    }
    const matches = string.matchAll(/[^.[\]]+|\[(?<expression>[^'"][^[]*|(?<quote>['"])(?<property>(?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g)
    for (const match of matches) {
      const {expression, property} = match.groups
      let [key] = match
      if (Helper.exists(property)) {
        key = property.replace(/\\(\\)?/g, '$1')
      } else if (Helper.exists(expression)) {
        key = expression
      }
      path.push(key)
    }
    return path
  }

  static toPath(value) {
    return Array.isArray(value) ? value.map(Helper.toKey) : Helper.isString(value) ? Helper.stringToPath(value) : Helper.exists(value) ? [Helper.toKey(value)] : []
  }

  static add(augend, addend) {
    return augend + addend
  }

  static subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  static multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  static divide(dividend, divisor) {
    return dividend - divisor
  }

  static now() {
    return Date.now()
  }

  static unix(options = {}) {
    const timestamp = Date.now() / 1000
    return options.millis ? timestamp : Math.floor(timestamp)
  }

  static chunk(array, size = 1) {
    return array.reduce((result, value, i) => i % size ? result : [...result, array.slice(i, i + size)], [])
  }

  static shuffle(array) {
    return array.map(value => [Math.random(), value]).sort(([a], [b]) => a - b).map(([random, value]) => value)
  }

  static uniq(array) {
    return [...new Set(array)]
  }

  static asciiWords(string) {
    return Helper.match(string, /[A-Z]?[a-z]+|[A-Z]+|\d+/g) || []
  }

  static unicodeWords(string) {
    return Helper.match(string, /\p{Lu}?\p{Ll}+|\p{Lu}+|\p{L}[\p{L}\p{M}]*|\p{N}+|\p{Emoji}/gu) || []
  }

  static words(string, pattern) {
    if (!Helper.exists(pattern)) {
      return Helper.isASCII(string) ? Helper.asciiWords(string) : Helper.unicodeWords(string)
    }
    return Helper.match(string, pattern) || []
  }

  static toLowerCase(string) {
    return Helper.toString(string).toLowerCase()
  }

  static toUpperCase(string) {
    return Helper.toString(string).toUpperCase()
  }

  static capitalize(string) {
    string = Helper.toString(string)
    return string.length ? string[0].toUpperCase() + string.slice(1).toLowerCase() : string
  }

  static lowerCase(string) {
    return Helper.words(string).join(' ').toLowerCase()
  }

  static upperCase(string) {
    return Helper.words(string).join(' ').toUpperCase()
  }

  static camelCase(string) {
    return Helper.words(string).reduce((result, word, i) => result + (i ? Helper.capitalize(word) : word.toLowerCase()), '')
  }

  static pascalCase(string) {
    return Helper.words(string).reduce((result, word) => result + Helper.capitalize(word), '')
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
    return Helper.words(string).join('.').toLowerCase()
  }

  static template(string, props = {}, options = {}) {
    const ignoreNotExists = Helper.isBoolean(options.ignoreNotExists) ? options.ignoreNotExists : true
    return Helper.replace(string, /(?<!\\){(.*?)(?<!\\)}|(\\\\?[{}])/g, (match, path, bracket) => {
      if (bracket) {
        return bracket.replace(/\\(\\)?/g, '$1')
      }
      let prop = Helper.get(props, path.replace(/\\(\\)?/g, '$1'))
      if (Helper.isFunction(prop)) {
        prop = prop()
      }
      return ignoreNotExists ? Helper.toString(prop) : prop
    })
  }

  static padStart(string, targetLength, padString) {
    return Helper.toString(string).padStart(targetLength, padString)
  }

  static padEnd(string, targetLength, padString) {
    return Helper.toString(string).padEnd(targetLength, padString)
  }

  static repeat(string, count) {
    return Helper.toString(string).repeat(count)
  }

  static replace(string, pattern, replacer) {
    return Helper.toString(string).replace(pattern, replacer)
  }

  static replaceAll(string, pattern, replacer) {
    return Helper.toString(string).replaceAll(pattern, replacer)
  }

  static slice(input, startIndex, endIndex) {
    return (Array.isArray(input) ? input : Helper.toString(input)).slice(startIndex, endIndex)
  }

  static substring(string, startIndex, beforeIndex) {
    return Helper.toString(string).substring(startIndex, beforeIndex)
  }

  static trim(string) {
    return Helper.toString(string).trim()
  }

  static indexOf(input, searchValue, fromIndex) {
    return (Array.isArray(input) ? input : Helper.toString(input)).indexOf(searchValue, fromIndex)
  }

  static lastIndexOf(input, searchValue, fromIndex) {
    return (Array.isArray(input) ? input : Helper.toString(input)).lastIndexOf(searchValue, fromIndex)
  }

  static match(string, pattern) {
    return Helper.toString(string).match(pattern)
  }

  static matchAll(string, pattern) {
    return Helper.toString(string).matchAll(pattern)
  }

  static search(string, pattern) {
    return Helper.toString(string).search(pattern)
  }

  static split(string, separator, limit) {
    return Helper.toString(string).split(separator, limit)
  }

  static equals(value, other) {
    return value === other
  }

  static startsWith(string, searchValue, position) {
    return Helper.toString(string).startsWith(searchValue, position)
  }

  static endsWith(string, searchValue, length) {
    return Helper.toString(string).endsWith(searchValue, length)
  }

  static includes(input, searchValue, fromIndex) {
    return (Array.isArray(input) ? input : Helper.toString(input)).includes(searchValue, fromIndex)
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

  static isKey(value) {
    return Helper.isString(value) || Helper.isSymbol(value)
  }

  static isIndex(value, length) {
    if (!Helper.exists(length)) {
      length = Number.MAX_SAFE_INTEGER
    }
    return !!length && !Helper.isSymbol(value) && /^(?:0|[1-9]\d*)$/.test(value) && value < length
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
