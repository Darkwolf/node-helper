# Helper
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/helper.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/helper.cjs`
## Using
```javascript
// ECMAScript
import Helper from '@darkwolf/helper.mjs'
// CommonJS
const Helper = require('@darkwolf/helper.cjs')

const object = {
  ave: {
    darkwolf: {
      array: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    },
    user: {
      username: null,
      email: undefined
    }
  }
}
Helper.get(object, 'ave.darkwolf') // =>
// {
//   array: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
// }
Helper.get(object, 'ave.darkwolf.array[0]') // => 2
Helper.get(object, ['ave', 'darkwolf', 'array', '9']) // => 1024
Helper.has(object, 'ave.darkwolf') // => true
Helper.has(object, 'ave.user.username') // => true
Helper.has(object, 'ave.user.email') // => true
Helper.exists(false) // => true
Helper.existsIn(object, 'ave.user.username') // => false
Helper.existsIn(object, 'ave.user.email') // => false
Helper.existsIn(object, 'ave.darkwolf.array[0]') // => true
Helper.existsIn(object, ['ave', 'darkwolf', 'array', '10']) // => false
Helper.set(object, 'ave.darkwolf', 'Ave, Darkwolf!') // =>
// {
//   ave: {
//     darkwolf: 'Ave, Darkwolf!',
//     user: {
//       username: null,
//       email: undefined
//     }
//   }
// }
object.ave.darkwolf // => 'Ave, Darkwolf!'
Helper.delete(object, 'ave.user') // => true
object.ave // =>
// {
//   ave: {
//     darkwolf: 'Ave, Darkwolf!'
//   }
// }
Helper.template('Ave, @{username}!', {
  username: 'PavelWolfDark'
}) // => 'Ave, @PavelWolfDark!'
Helper.template('WFC: {wallet.balance}', {
  wallet: {
    balance: 1.00000001
  }
}) // => 'WFC: 1.00000001'
Helper.isIPv4('192.168.0.0') // => true
Helper.isIPv6('::192.168.0.0') // => true
Helper.isURL('example.com') // => false
Helper.isURL('https://example.com') // => true
```
## [API Documentation](https://github.com/Darkwolf/node-helper/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
