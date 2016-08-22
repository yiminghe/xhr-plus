module.exports = function* () {
    this.type='json';
    this.body=this.request.body&&this.request.body.fields ||this.request.body;
};