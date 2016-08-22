/**
 * advanced io tc
 * @author yiminghe@gmail.com
 **/

var io = require('io');
var util = require('util');
var UA = require('ua');
/*jshint quotmark:false*/
// travis-ci will not pass ...
if (UA.phantomjs && UA.os === 'linux') {
    return;
}

describe("io upload", function () {
    this.timeout(5000);

    it("should abort for form file upload", function (done) {
        var f = $('<form>' +
            '<input name="testFile" type="file"/>' +
            '<select name="test" multiple>' +
            '<option value="t1" selected>v</option>' +
            '<option value="t2" selected>v2</option>' +
            '</select>' +
            '</form>').appendTo('body');

        var ret = [], d;

        var xhr = io({
            url: '/tests/browser/others/form/upload.jss',
            form: f[0],
            type: 'post',
            dataType: 'json',
            data: {
                "test2": "t2"
            },
            serializeArray: false,
            error: function (d, s) {
                ret.push(s);
            },
            success: function (data, s) {
                d = data;
                ret.push(s);
            },
            complete: function (d, s) {
                ret.push(s);
                expect(ret).to.eql(["abort", "abort"]);
                setTimeout(function () {
                    f.remove();
                    done();
                }, 1000);
            }
        });

        xhr.abort();
    });

    if (!UA.ie || UA.ie > 7) {
        it("nothing happens if abort after form file upload", function (done) {
            // error !
            var f = $('<form action="http://www.alibaba.com">' +
                '<input name="testFile" type="file"/>' +
                '<select name="test" multiple>' +
                '<option value="t1" selected>v</option>' +
                '<option value="t2" selected>v2</option>' +
                '</select>' +
                '</form>').appendTo('body');

            var ret = [], d;

            var xhr = io({
                url: '/tests/browser/others/form/upload.jss',
                form: f[0],
                type: 'post',
                dataType: 'json',
                serializeArray: false,
                data: {
                    "test2": ["t2", "t3"]
                },
                error: function (d, s) {
                    ret.push(s);
                },
                success: function (data, s) {
                    d = data;
                    ret.push(s);
                },
                complete: function (d, s) {
                    ret.push(s);
                    setTimeout(function () {
                        xhr.abort();
                        expect(ret.join(",")).to.be(["success", "success"].join(","));
                        f.remove();
                        setTimeout(done, 100);
                    }, 100);
                }
            });
        });

        it("fileupload support xml return data", function (done) {
            var form = $('<form>' +
                '<input name="test" value=\'1\'/>' +
                '<input name="test2" value=\'2\'/>' +
                '<input name="testFile" type="file"/>' +
                '</form>').appendTo('body');

            io({
                type: 'post',
                form: form[0],
                dataType: 'xml',
                serializeArray: false,
                url: '/tests/browser/data/xml.jss',
                success: function (data) {
                    expect(data.nodeType).to.be(9);
                    expect(data.documentElement.nodeType).to.be(1);
                    form.remove();
                    setTimeout(done, 100);
                }
            });
        });

        it("fileupload support html return data", function (done) {
            var form = $('<form>' +
                '<input name="test" value=\'1\'/>' +
                '<input name="test2" value=\'2\'/>' +
                '<input name="testFile" type="file"/>' +
                '</form>').appendTo('body');

            io({
                type: 'post',
                form: form[0],
                dataType: 'html',
                serializeArray: false,
                url: '/tests/browser/data/html.jss',
                success: function (data) {
                    expect(data.toLowerCase()).to.be('<b>html</b>');
                    form.remove();
                    setTimeout(done, 100);
                }
            });
        });

        // same with html
        it("fileupload support text return data", function (done) {
            var form = $('<form>' +
                '<input name="test" value=\'1\'/>' +
                '<input name="test2" value=\'2\'/>' +
                '<input name="testFile" type="file"/>' +
                '</form>').appendTo('body');

            io({
                type: 'post',
                form: form[0],
                dataType: 'text',
                serializeArray: false,
                url: '/tests/browser/data/html.jss',
                success: function (data) {
                    expect(data.toLowerCase()).to.be('<b>html</b>');
                    form.remove();
                    setTimeout(done, 100);
                }
            });
        });

        it('should error when upload to a cross domain page', function (done) {
            var url = location.hostname;

            var form = $('<form>' +
                '<input name="test" value=\'1\'/>' +
                '<input name="test2" value=\'2\'/>' +
                '<input name="test3" type=\'file\'/>' +
                '</form>').appendTo('body');

            // ie upload-domain.jss 必须设置 domain
            // 否则 localhost:8888 和 localhost:9999 默认可以通信...

            // 标准浏览器是 cors 关系
            url += ':' + window.SERVER_CONFIG.ports[1];

            var uploadRc = 'http://' + url + '/tests/browser/others/form/upload.jss';

            window.ioDEBUG = 1;

            io({
                type: 'post',
                form: form[0],
                dataType: 'json',
                serializeArray: false,
                url: uploadRc,
                error: function (data, statusText) {
                    // cors 无出错信息
                    expect(statusText || 'parser error').to.be('parser error');
                },
                complete: function () {
                    form.remove();
                    setTimeout(done, 100);
                }
            });
        });
    }
});