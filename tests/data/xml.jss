module.exports = function* () {
    this.type = 'xml';
    this.body = ('<?xml version="1.0" encoding="utf-8" ?>' +
        '<item><name>John</name></item>');
};