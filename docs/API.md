[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

# API
### class: Helper
#### `static` Helper.type(value)
* `value` <[any][Object]>
* returns: <[string][string]>

#### `static` Helper.tag(value)
* `value` <[any][Object]>
* returns: <[string][string]> Have format: `'[object <Tag>]'`.

#### `static` Helper.keyPath(path)
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will return the last argument of the array, then `'[-2]'` will return the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be returned.
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.get(object, path)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will return the last argument of the array, then `'[-2]'` will return the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be returned.
* returns: <[any][Object]>

#### `static` Helper.set(object, path, value)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will set the last argument of the array, then `'[-2]'` will set the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be set.
* `value` <[any][Object]> This value will be returned.
* returns: <[any][Object]>

#### `static` Helper.has(object, path)
* `object` <[Object][Object]>
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will validate the last argument of the array, then `'[-2]'` will validate the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be validated.
* returns: <[boolean][boolean]>

#### `static` Helper.exists(value[, path])
* `value` <[any][Object]> If `undefined` or `null` will be return `false`.
* `path` <[string][string] | [Array][Array]<[string][string]>> Must have format: `'object.property.name.array[0]'`, `['object', 'property', 'name', 'array[0]']`, `['object.property', 'name.array[0]']` or `'[-1]'`. Path with index `'[-1]'` will validate the last argument of the array, then `'[-2]'` will validate the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be validated.
* returns: <[boolean][boolean]>

#### `static` Helper.boolean(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.float(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.integer(value)
* `value` <[any][Object]>
* returns: <[number][number]>

#### `static` Helper.chunk(array, size)
* `array` <[Array][Array]>
* `size` <[number][number]>
* returns: <[Array][Array]<[Array][Array]>>

#### `static` Helper.shuffle(array)
* `array` <[Array][Array]>
* returns: <[Array][Array]>

#### `static` Helper.unique(array)
* `array` <[Array][Array]>
* returns: <[Array][Array]>

#### `static` Helper.words(string)
* `string` <[string][string]>
* returns: <[Array][Array]<[string][string]>>

#### `static` Helper.capitalize(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'Ave, darkwolf!'`.
* returns: <[string][string]>

#### `static` Helper.lowerCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'ave, darkwolf!'`.
* returns: <[string][string]>

#### `static` Helper.upperCase(string)
* `string` <[string][string]> E.g., `'Ave, Darkwolf!'` will return `'AVE, DARKWOLF!'`.
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

#### `static` Helper.normalizeString(value)
* `value` <[string][string]> If `undefined` or `null` will be return `''`.
* returns: <[string][string]>

#### `static` Helper.template(string, props[, options])
* `string` <[string][string]> Property path must have format: `'{object.property.name.array[0]}'` or `'array[-1]'`. Path with index `'[-1]'` will return the last argument of the array, then `'[-2]'` will return the second last argument. If the negative modulo index is greater than the length of the array, the first argument will be returned.
* `props` <[Object][Object]>
* `options` <[Object][Object]>
  * `normalize` <?[boolean][boolean]> If `true` and property is `undefined` or `null` will be replaced with `''`. Defaults to `true`.
* returns: <[string][string]>

#### `static` Helper.equals(value, other)
* `value` <[any][Object]>
* `other` <[any][Object]>
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

#### `static` Helper.isJSON(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isASCII(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>

#### `static` Helper.isBase64(value)
* `value` <[any][Object]>
* returns: <[boolean][boolean]>
