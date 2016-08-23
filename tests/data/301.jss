'use strict';

module.exports = function *() {
    this.status =301;
    this.set('Location', 'http://' + this.get('Host') + '/tests/data/package.jss');
};