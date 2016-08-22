module.exports = function* () {
    this.set('Content-Type', 'text/html');
    this.body = ('<html><script>window.ooxx_html_jss=1</script><body><b>html</b></body></html>');
};