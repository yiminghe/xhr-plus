module.exports = function* () {
    if (this.get('If-Modified-Since')) {
        this.set('Expires', 'Thu, 16 Aug 2012 01:50:40 GMT');
        this.status = (304);
    } else {
        this.set('Last-Modified', 'Thu, 18 Jul 2002 15:48:32 GMT');
        this.set('Expires', 'Thu, 16 Aug 2012 01:50:40 GMT');
        this.body = ('haha');
    }
};