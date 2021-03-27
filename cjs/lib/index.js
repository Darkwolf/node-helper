class Helper {}
Helper.typeOf = value => typeof value
Helper.tagOf = value => Object.prototype.toString.call(value)
Helper.hasOwnProperty = (object, property) => Object.prototype.hasOwnProperty.call(object, property)
Helper.get = (object, path, defaultValue) => {
  path = Helper.toPath(path)
  let result
  if (path.length) {
    let obj = object
    let i = 0
    for (const key of path) {
      const prop = obj[key]
      if (i < path.length - 1) {
        if (prop) {
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
  return result === undefined ? defaultValue : result
}
Helper.set = (object, path, value) => {
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
Helper.delete = (object, path) => {
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
Helper.has = (object, path) => {
  path = Helper.toPath(path)
  if (path.length) {
    let obj = object
    let i = 0
    for (const key of path) {
      if (i < path.length - 1) {
        const prop = obj[key]
        if (prop) {
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
  return false
}
Helper.hasIn = (object, path) => {
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
Helper.exists = value => value != null
Helper.existsIn = (object, path) => Helper.get(object, path) != null
Helper.toBoolean = value => !!value
Helper.toNumber = value => Number(value)
Helper.toFinite = value => Math.max(Math.min(value, Number.MAX_VALUE), -Number.MAX_VALUE)
Helper.toFloat = value => Helper.toFinite(value)
Helper.toInteger = value => Math.floor(Helper.toFinite(value))
Helper.toSafeInteger = value => Math.max(Math.min(value, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
Helper.toString = value => value != null ? `${value}` : ''
Helper.toKey = value => Helper.isSymbol(value) ? value : `${value}`
Helper.stringToPath = string => {
  string = Helper.toString(string)
  const path = []
  if (string.startsWith('.')) {
    path.push('')
  }
  const matches = string.matchAll(/[^.[\]]+|\[(?<expression>[^'"][^[]*|(['"])(?<property>(?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g)
  for (const match of matches) {
    const [key] = match
    const {expression, property} = match.groups
    path.push(property !== undefined ? property.replace(/\\(\\)?/g, '$1') : expression !== undefined ? expression : key)
  }
  return path
}
Helper.toPath = value => value !== undefined ? (Helper.isString(value) ? Helper.stringToPath(value) : Array.isArray(value) ? value.map(Helper.toKey) : [Helper.toKey(value)]) : []
Helper.add = (augend, addend) => Number(augend) + Number(addend)
Helper.subtract = (minuend, subtrahend) => Number(minuend) - Number(subtrahend)
Helper.multiply = (multiplier, multiplicand) => multiplier * multiplicand
Helper.divide = (dividend, divisor) => dividend / divisor
Helper.now = () => Date.now()
Helper.unix = (options = {}) => {
  const timestamp = Date.now() / 1e3
  return options.millis ? timestamp : Math.floor(timestamp)
}
Helper.chunk = (array, size = 1) => {
  size = Number(size)
  return array.reduce((result, value, i) => i % size ? result : [...result, array.slice(i, i + size)], [])
}
Helper.shuffle = array => array.map(value => [Math.random(), value]).sort(([a], [b]) => a - b).map(([random, value]) => value)
Helper.uniq = array => [...new Set(array)]
Helper.asciiWords = string => Helper.match(string, /[A-Z]?[a-z]+|[A-Z]+|\d+/g) || []
Helper.unicodeWords = string => Helper.match(string, /\p{Lu}?\p{Ll}+|\p{Lu}+|\p{L}[\p{L}\p{M}]*|\p{N}+|\p{Emoji}/gu) || []
Helper.words = (string, pattern) => pattern !== undefined ? Helper.match(string, pattern) || [] : Helper.isASCII(string) ? Helper.asciiWords(string) : Helper.unicodeWords(string)
Helper.toLowerCase = string => Helper.toString(string).toLowerCase()
Helper.toUpperCase = string => Helper.toString(string).toUpperCase()
Helper.capitalize = string => {
  string = Helper.toString(string)
  return string.length ? string[0].toUpperCase() + string.slice(1).toLowerCase() : string
}
Helper.lowerCase = string => Helper.words(string).join(' ').toLowerCase()
Helper.upperCase = string => Helper.words(string).join(' ').toUpperCase()
Helper.camelCase = string => Helper.words(string).reduce((result, word, i) => result + (i ? Helper.capitalize(word) : word.toLowerCase()), '')
Helper.pascalCase = string => Helper.words(string).reduce((result, word) => result + Helper.capitalize(word), '')
Helper.snakeCase = string => Helper.words(string).join('_').toLowerCase()
Helper.constantCase = string => Helper.words(string).join('_').toUpperCase()
Helper.kebabCase = string => Helper.words(string).join('-').toLowerCase()
Helper.trainCase = string => Helper.words(string).map(Helper.capitalize).join('-')
Helper.dotCase = string => Helper.words(string).join('.').toLowerCase()
Helper.template = (string, props = {}, options = {}) => {
  const ignoreUndefined = options.ignoreUndefined !== undefined ? options.ignoreUndefined : true
  return Helper.replace(string, /(?<!\\){(.*?)(?<!\\)}|(\\\\?[{}])/g, (match, path, bracket) => {
    if (bracket) {
      return bracket.replace(/\\(\\)?/g, '$1')
    }
    let prop = Helper.get(props, path.replace(/\\(\\)?/g, '$1'))
    if (Helper.isFunction(prop)) {
      prop = prop()
    }
    return ignoreUndefined && prop === undefined ? '' : prop
  })
}
Helper.insert = (string, insertString, startIndex, endIndex) => {
  string = Helper.toString(string)
  insertString = Helper.toString(insertString)
  startIndex = startIndex !== undefined ? startIndex : string.length
  endIndex = endIndex !== undefined ? endIndex : string.length
  return string.slice(0, startIndex) + insertString + string.slice(startIndex, endIndex)
}
Helper.padStart = (string, targetLength, padString) => Helper.toString(string).padStart(targetLength, padString)
Helper.padEnd = (string, targetLength, padString) => Helper.toString(string).padEnd(targetLength, padString)
Helper.repeat = (string, count) => Helper.toString(string).repeat(count)
Helper.replace = (string, pattern, replacer) => Helper.toString(string).replace(pattern, replacer)
Helper.replaceAll = (string, pattern, replacer) => Helper.toString(string).replaceAll(pattern, replacer)
Helper.slice = (input, startIndex, endIndex) => (Array.isArray(input) ? input : Helper.toString(input)).slice(startIndex, endIndex)
Helper.substring = (string, startIndex, beforeIndex) => Helper.toString(string).substring(startIndex, beforeIndex)
Helper.trim = (string) => Helper.toString(string).trim()
Helper.indexOf = (input, searchValue, fromIndex) => (Array.isArray(input) ? input : Helper.toString(input)).indexOf(searchValue, fromIndex)
Helper.lastIndexOf = (input, searchValue, fromIndex) => (Array.isArray(input) ? input : Helper.toString(input)).lastIndexOf(searchValue, fromIndex)
Helper.match = (string, pattern) => Helper.toString(string).match(pattern)
Helper.matchAll = (string, pattern) => Helper.toString(string).matchAll(pattern)
Helper.search = (string, pattern) => Helper.toString(string).search(pattern)
Helper.split = (string, separator, limit) => Helper.toString(string).split(separator, limit)
Helper.equals = (value, other) => value === other
Helper.startsWith = (string, searchValue, position) => Helper.toString(string).startsWith(searchValue, position)
Helper.endsWith = (string, searchValue, length) => Helper.toString(string).endsWith(searchValue, length)
Helper.includes = (input, searchValue, fromIndex) => (Array.isArray(input) ? input : Helper.toString(input)).includes(searchValue, fromIndex)
Helper.isType = (value, type) => typeof value === type
Helper.isTag = (value, tag) => Helper.tagOf(value) === tag
Helper.isInstance = (value, constructor) => value instanceof constructor
Helper.isUndefined = value => value === undefined
Helper.isPrimitive = value => {
  const type = typeof value
  return (type !== 'object' && type !== 'function') || value === null
}
Helper.isNull = value => value === null
Helper.isNil = value => value == null
Helper.isObject = value => typeof value === 'object' && value !== null
Helper.isObjectLike = value => {
  const type = typeof value
  return (type === 'object' || type === 'function') && value !== null
}
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
Helper.isEmpty = value => !value || !value.length
Helper.isKey = value => Helper.isString(value) || Helper.isSymbol(value)
Helper.isIndex = (value, length = Number.MAX_SAFE_INTEGER) => {
  length = Number(length)
  return !!length && !Helper.isSymbol(value) && /^(?:0|[1-9]\d*)$/.test(value) && value < length
}
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
Helper.isIPv4 = value => /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(value)
Helper.isIPv6 = value => /^(?:(?:::(?:[A-Fa-f\d]{1,4}:){0,5}|[A-Fa-f\d]{1,4}::(?:[A-Fa-f\d]{1,4}:){0,4}|(?:[A-Fa-f\d]{1,4}:){2}:(?:[A-Fa-f\d]{1,4}:){0,3}|(?:[A-Fa-f\d]{1,4}:){3}:(?:[A-Fa-f\d]{1,4}:){0,2}|(?:[A-Fa-f\d]{1,4}:){4}:(?:[A-Fa-f\d]{1,4}:)?|(?:[A-Fa-f\d]{1,4}:){5}:|(?:[A-Fa-f\d]{1,4}:){6})(?<ipv4>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|:(?::|(?::[A-Fa-f\d]{1,4}){1,7})|[A-Fa-f\d]{1,4}:(?::|(?::[A-Fa-f\d]{1,4}){1,6})|(?:[A-Fa-f\d]{1,4}:){2}(?::|(?::[A-Fa-f\d]{1,4}){1,5})|(?:[A-Fa-f\d]{1,4}:){3}(?::|(?::[A-Fa-f\d]{1,4}){1,4})|(?:[A-Fa-f\d]{1,4}:){4}(?::|(?::[A-Fa-f\d]{1,4}){1,3})|(?:[A-Fa-f\d]{1,4}:){5}(?::|(?::[A-Fa-f\d]{1,4}){1,2})|(?:[A-Fa-f\d]{1,4}:){6}(?::|(?::[A-Fa-f\d]{1,4}))|(?:[A-Fa-f\d]{1,4}:){7}:|(?:[A-Fa-f\d]{1,4}:){7}[A-Fa-f\d]{1,4})$/.test(value)
Helper.isURL = value => /^(?<origin>(?<protocol>https?):\/\/(?<host>(?<hostname>(?<domain>(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])*)\.)+(?:[a-z]{2,}))|(?<ip>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|\[(?<ipv6>(?:::(?:[A-Fa-f\d]{1,4}:){0,5}|[A-Fa-f\d]{1,4}::(?:[A-Fa-f\d]{1,4}:){0,4}|(?:[A-Fa-f\d]{1,4}:){2}:(?:[A-Fa-f\d]{1,4}:){0,3}|(?:[A-Fa-f\d]{1,4}:){3}:(?:[A-Fa-f\d]{1,4}:){0,2}|(?:[A-Fa-f\d]{1,4}:){4}:(?:[A-Fa-f\d]{1,4}:)?|(?:[A-Fa-f\d]{1,4}:){5}:|(?:[A-Fa-f\d]{1,4}:){6})(?<ipv4>(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|:(?::|(?::[A-Fa-f\d]{1,4}){1,7})|[A-Fa-f\d]{1,4}:(?::|(?::[A-Fa-f\d]{1,4}){1,6})|(?:[A-Fa-f\d]{1,4}:){2}(?::|(?::[A-Fa-f\d]{1,4}){1,5})|(?:[A-Fa-f\d]{1,4}:){3}(?::|(?::[A-Fa-f\d]{1,4}){1,4})|(?:[A-Fa-f\d]{1,4}:){4}(?::|(?::[A-Fa-f\d]{1,4}){1,3})|(?:[A-Fa-f\d]{1,4}:){5}(?::|(?::[A-Fa-f\d]{1,4}){1,2})|(?:[A-Fa-f\d]{1,4}:){6}(?::|(?::[A-Fa-f\d]{1,4}))|(?:[A-Fa-f\d]{1,4}:){7}:|(?:[A-Fa-f\d]{1,4}:){7}[A-Fa-f\d]{1,4})\])(:(?<port>[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d{1}|6553[0-5]))?))(?<path>(?<pathname>(?:\/[\w-.%+@&:~]*)*)(?<search>\?(?<query>[\w-.%+@&=:;,~]*))?(?<fragment>#(?<hash>[\w-]*))?)$/.test(value)
Helper.isUUID = value => /^[A-Fa-f\d]{8}-(?:[A-Fa-f\d]{4}-){3}[A-Fa-f\d]{12}$/.test(value)

module.exports = Helper
