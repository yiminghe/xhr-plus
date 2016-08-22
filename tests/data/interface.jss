function timeout(ms){
    return function(done){
        setTimeout(done,ms);
    };
}
module.exports = function* () {
    var contentType, sleep, query = this.query;
    if ((contentType = query.contentType)) {
        this.set('Content-Type', contentType);
    }

    sleep = query.sleep;

    function merge() {
        var ret = {};
        for (var i = 0; i < arguments.length; i++) {
            var from = arguments[i];
            for (var j in from) {
                ret[j] = from[j];
            }
        }
        return ret;
    }

    function run() {
        var data = merge({
                contentType: this.get('content-type'),
                'name': 'test',
                'birth': '2010/11/23',
                'email': 'test@gmail.com'
            }, query, this.request.body&&this.request.body.fields ||this.request.body), dataStr = JSON.stringify(data),
            t;

        if (t = (query.customCallback || query.callback)) {
            dataStr = t + '(' + dataStr + ');';
        } else if (this.method === 'POST' && query.dataType === 'script') {
            dataStr = 'var globalScriptTest = 500;';
        } else if (query.dataType === 'script') {
            dataStr = 'var globalScriptTest = 200;';
        }

        this.body =(dataStr);
    }

    if (sleep) {
        yield timeout(sleep);
        run.call(this);
    } else {
        run.call(this);
    }
};