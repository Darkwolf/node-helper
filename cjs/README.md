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

const obj = {
  ave: {
    darkwolf: {
      arr: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    },
    user: {
      username: null,
      email: undefined
    }
  }
}
Helper.get(obj, 'ave.darkwolf') // => {arr: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]}
Helper.get(obj, ['ave', 'darkwolf', 'arr', '[-1]']) // => 1024
Helper.get(obj, ['ave.darkwolf.arr[-11]']) // => 2
Helper.has(obj, 'ave.darkwolf') // => true
Helper.has(obj, 'ave.user.username') // => true
Helper.has(obj, 'ave.user.email') // => true
Helper.exists(false) // => true
Helper.exists(obj, 'ave.user.username') // => false
Helper.exists(obj, 'ave.user.email') // => false
Helper.exists(obj, ['ave', 'darkwolf', 'arr', '[0]']) // => true
Helper.exists(obj, ['ave.darkwolf.arr[10]']) // => false
Helper.set(obj, 'ave.darkwolf', 'Ave, Darkwolf!') // => 'Ave, Darkwolf!'
obj.ave.darkwolf // => 'Ave, Darkwolf!'
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
Helper.isURL('Ave, Darkwolf!') // => false
```
## [API Documentation](https://github.com/Darkwolf/node-helper/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
