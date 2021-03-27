[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[RegExp]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[Symbol.iterator]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

# API
### class: Helper
#### `static` Helper.typeOf(value)
* `value` <[any][Object]>
* returns: <[string][string]>

#### `static` Helper.tagOf(value)
* `value` <[any][Object]>
* returns: <[string][string]> Have format: `'[object <Tag>]'`.

#### `static` Helper.hasOwnProperty(object, property)
* `object` <[any][object]>
* `property` <[string][string]>
* returns: <[boolean][boolean]>

#### `static` Helper.get(object, path, defaultValue)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be get.
* `defaultValue` <[any][Object]> If value is `undefined` will be returned. Defaults to `undefined`.
* returns: <[any][Object]>

#### `static` Helper.set(object, path, value)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be set.
* `value` <[any][Object]>
* returns: <[any][Object]> This object will be returned.

#### `static` Helper.delete(object, path)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be deleted.
* returns: <[boolean][boolean]>

#### `static` Helper.has(object, path)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be used.
* returns: <[boolean][boolean]>

#### `static` Helper.hasIn(object, path)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be used.
* returns: <[boolean][boolean]>

#### `static` Helper.exists(value)
* `value` <[any][Object]> If `undefined` or `null` will be return `false`.
* returns: <[boolean][boolean]>

#### `static` Helper.existsIn(object, path)
* `value` <[any][Object]> If `undefined` or `null` will be return `false`.
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]` will not be used.
* returns: <[boolean][boolean]>

#### `static` Helper.toBoolean(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.toNumber(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.toFinite(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.toFloat(value)
Alias for <[Helper.toFinite(value)](#static-helpertofinitevalue)>.
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.toInteger(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.toSafeInteger(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.toString(value)
* `value` <[string][string]> If `undefined` or `null` will be return `''`.
* returns: <[string][string]>

#### `static` Helper.toKey(value)
* `value` <[any][object]>
* returns: <[string][string] | [Symbol][Symbol]>

#### `static` Helper.stringToPath(string)
* `string` <[string][string]> Must have format: `'object.property.key.path[0]'`. If `''` will be return `[]`.
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.toPath(path)
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.key.path[0]'`. If `undefined`, `null`, `''` or `[]`, will be return `[]`.
* returns: <[Array][Array]<[string][string] | [Symbol][Symbol]>>

#### `static` Helper.add(augend, addend)
* `augend` <[number][number]>
* `addend` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.subtract(minuend, subtrahend)
* `minuend` <[number][number]>
* `subtrahend` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.multiply(multiplier, multiplicand)
* `multiplier` <[number][number]>
* `multiplicand` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.divide(dividend, divisor)
* `dividend` <[number][number]>
* `divisor` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.now()
* returns: <[number][number]>

#### `static` Helper.unix([options])
* `options` <[Object][Object]>
  * `millis` <?[boolean][boolean]> If `true` will return the current Unix timestamp in seconds with millisecond fraction. Defaults to `false`.
* returns: <[number][number]>

#### `static` Helper.chunk(array, size)
* `array` <[Array][Array]>
* `size` <[number][number]> Defaults to `1`.
* returns: <[Array][Array]<[Array][Array]>>

#### `static` Helper.shuffle(array)
* `array` <[Array][Array]>
* returns: <[Array][Array]>

#### `static` Helper.uniq(array)
* `array` <[Array][Array]>
* returns: <[Array][Array]>

#### `static` Helper.asciiWords(string)
* `string` <[string][string]>
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.unicodeWords(string)
* `string` <[string][string]>
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.words(string[, pattern])
* `string` <[string][string]>
* `pattern` <[string][string] | [RegExp][RegExp]>
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.toLowerCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave, darkwolf!'`.
* returns: <[string][string]>

#### `static` Helper.toUpperCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'AVE, DARKWOLF!'`.
* returns: <[string][string]>

#### `static` Helper.capitalize(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'Ave, darkwolf!'`.
* returns: <[string][string]>

#### `static` Helper.lowerCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave darkwolf'`.
* returns: <[string][string]>

#### `static` Helper.upperCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'AVE DARKWOLF'`.
* returns: <[string][string]>

#### `static` Helper.camelCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'aveDarkwolf'`.
* returns: <[string][string]>

#### `static` Helper.pascalCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'AveDarkwolf'`.
* returns: <[string][string]>

#### `static` Helper.snakeCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave_darkwolf'`.
* returns: <[string][string]>

#### `static` Helper.constantCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'AVE_DARKWOLF'`.
* returns: <[string][string]>

#### `static` Helper.kebabCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave-darkwolf'`.
* returns: <[string][string]>

#### `static` Helper.trainCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'Ave-Darkwolf'`.
* returns: <[string][string]>

#### `static` Helper.dotCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave.darkwolf'`.
* returns: <[string][string]>

#### `static` Helper.template(string[, props[, options])
* `string` <[string][string]> Property path must have format: `'{object.property.key.path[0]}'`.
* `props` <[Object][Object]> Defaults to `{}`.
* `options` <[Object][Object]>
  * `ignoreUndefined` <?[boolean][boolean]> If `true` and property is `undefined` will be replaced with `''`. Defaults to `true`.
* returns: <[string][string]>

#### `static` Helper.insert(string, insertString[, startIndex[, endIndex]])
* `string` <[string][string]>
* `insertString` <[string][string]>
* `startIndex` <[number][number]> Defaults `string.length`.
* `endIndex` <[number][number]> Defaults `string.length`.
* returns: <[string][string]>

#### `static` Helper.padStart(string, targetLength[, padString])
* `string` <[string][string]>
* `targetLength` <[number][number]>
* `padString` <[string][string]>
* returns: <[string][string]>

#### `static` Helper.padEnd(string, targetLength[, padString])
* `string` <[string][string]>
* `targetLength` <[number][number]>
* `padString` <[string][string]>
* returns: <[string][string]>

#### `static` Helper.repeat(string, count)
* `string` <[string][string]>
* `count` <[number][number]>
* returns: <[string][string]>

#### `static` Helper.replace(string, pattern, replacer)
* `string` <[string][string]>
* `pattern` <[RegExp][RegExp] | [string][string]>
* `replacer` <[string][string] | [Function][Function](<[string][string]>, ...<[string][string]>, <[number][number]>, <[string][string]>)>
  * `match` <[string][string]>
  * `...groups` <[string][string]>
  * `offset` <[number][number]>
  * `string` <[string][string]>
* returns: <[string][string]>

#### `static` Helper.replaceAll(string, pattern, replacer)
* `string` <[string][string]>
* `pattern` <[RegExp][RegExp] | [string][string]>
* `replacer` <[string][string] | [Function][Function](<[string][string]>, ...<[string][string]>, <[number][number]>, <[string][string]>)>
  * `match` <[string][string]>
  * `...groups` <[string][string]>
  * `offset` <[number][number]>
  * `string` <[string][string]>
* returns: <[string][string]>

#### `static` Helper.slice(input, startIndex[, endIndex])
* `input` <[string][string] | [Array][Array]>
* `startIndex` <[number][number]>
* `endIndex` <[number][number]>
* returns: <[string][string] | [Array][Array]>

#### `static` Helper.substring(string, startIndex[, beforeIndex])
* `string` <[string][string]>
* `startIndex` <[number][number]>
* `beforeIndex` <[number][number]>
* returns: <[string][string]>

#### `static` Helper.trim(string)
* `string` <[string][string]>
* returns: <[string][string]>

#### `static` Helper.indexOf(input, searchValue[, fromIndex])
* `input` <[string][string] | [Array][Array]>
* `searchValue` <[any][Object]>
* `fromIndex` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.lastIndexOf(input, searchValue[, fromIndex])
* `input` <[string][string] | [Array][Array]>
* `searchValue` <[any][Object]>
* `fromIndex` <[number][number]>
* returns: <[number][number]>

#### `static` Helper.match(string, pattern)
* `string` <[string][string]>
* `pattern` <[RegExp][RegExp] | [string][string]>
* returns: <?[Array][Array]<[string][string]>>

#### `static` Helper.matchAll(string, pattern)
* `string` <[string][string]>
* `pattern` <[RegExp][RegExp] | [string][string]>
* returns: <[Symbol.iterator][Symbol.iterator]<[Array][Array]<[string][string]>>>

#### `static` Helper.search(string[, pattern])
* `string` <[string][string]>
* `pattern` <[RegExp][RegExp] | [string][string]>
* returns: <[number][number]>

#### `static` Helper.split(string[, separator[, limit]])
* `string` <[string][string]>
* `separator` <[RegExp][RegExp] | [string][string]>
* `limit` <[number][number]>
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.equals(value, other)
* `value` <[any][Object]>
* `other` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.startsWith(string, searchValue[, position])
* `string` <[string][string]>
* `searchValue` <[any][Object]>
* `position` <[number][number]>
* returns: <[boolean][boolean]>

#### `static` Helper.endsWith(string, searchValue[, length])
* `string` <[string][string]>
* `searchValue` <[any][Object]>
* `length` <[number][number]>
* returns: <[boolean][boolean]>

#### `static` Helper.includes(input, searchValue[, fromIndex])
* `input` <[string][string] | [Array][Array]>
* `searchValue` <[any][Object]>
* `fromIndex` <[number][number]>
* returns: <[boolean][boolean]>

#### `static` Helper.isType(value, type)
* `value` <[any][Object]>
* `type` <[string][string]>
* returns: <[boolean][boolean]>

#### `static` Helper.isTag(value, tag)
* `value` <[any][Object]>
* `tag` <[string][string]> Must have format: `[object <Tag>]`.
* returns: <[boolean][boolean]>

#### `static` Helper.isInstance(value, constructor)
* `value` <[any][Object]>
* `constructor` <[Object][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isUndefined(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isPrimitive(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNull(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNil(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isObject(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isObjectLike(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isPlainObject(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isFunction(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isAsyncFunction(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isBoolean(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNumber(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isString(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isSymbol(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isArray(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isBuffer(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isTypedArray(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isRegExp(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isSet(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isMap(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isWeakSet(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isWeakMap(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isPromise(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isDate(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isError(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isFinite(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isFloat(value)
Alias for <[Helper.isFinite(value)](#static-helperisfinitevalue)>.
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isInteger(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isSafeInteger(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNaN(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isInfinity(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isDecimal(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isPositive(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNegative(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNonNegative(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNonPositive(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isNatural(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isWhole(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isEmpty(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isKey(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isIndex(value[, length])
* `value` <[any][Object]>
* `length` <[number][number]>
* returns: <[boolean][boolean]>

#### `static` Helper.isJSON(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isASCII(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isBase64(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isIPv4(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isIPv6(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isURL(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isUUID(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>
