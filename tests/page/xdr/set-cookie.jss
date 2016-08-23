module.exports = function*() {
  this.set('ContentType', 'text/html');
  this.body = `<script>
    document.cookie = 'cors=ok;';
    </script>`;
};