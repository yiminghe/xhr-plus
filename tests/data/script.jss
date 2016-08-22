module.exports=function*(){
    this.set('Content-Type','text/javascript');
    this.body = ('alert("script loaded");');
};