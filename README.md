# xhr-enhancer
---

XMLHttpRequest enhancer. support jsonp, iframe upload, sub domain proxy and more...

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/xhr-enhancer.svg?style=flat-square
[npm-url]: http://npmjs.org/package/xhr-enhancer
[travis-image]: https://img.shields.io/travis/yiminghe/xhr-enhancer.svg?style=flat-square
[travis-url]: https://travis-ci.org/yiminghe/xhr-enhancer
[coveralls-image]: https://img.shields.io/coveralls/yiminghe/xhr-enhancer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yiminghe/xhr-enhancer?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/yiminghe/xhr-enhancer.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/yiminghe/xhr-enhancer
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/xhr-enhancer.svg?style=flat-square
[download-url]: https://npmjs.org/package/xhr-enhancer


## Example

http://localhost:8000/examples/


## install


[![xhr-enhancer](https://nodei.co/npm/xhr-enhancer.png)](https://npmjs.org/package/xhr-enhancer)


## Usage

```js
import io from 'xhr-enhancer';
io({
 url: '',
 method: '',
 success(data) {
 },
 error(e) {
 },
}).then((data) => {
});
```

## API

### config

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>url</td>
          <td>String</td>
          <td></td>
          <td>url requested</td>
        </tr>
    </tbody>
</table>


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

xhr-enhancer is released under the MIT license.
