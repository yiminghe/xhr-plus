module.exports=function*(){
    this.set('Content-Type','text/javascript');
    this.body=(this.query.callback+'(1,2);');
};