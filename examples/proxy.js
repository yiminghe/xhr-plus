import io from 'xhr-enhancer';
document.domain = 'alipay.com';

io({
  url: '//local2.alipay.com:8000/examples/data/res.json',
  useSubDomainProxy: 'force',
  success(...args) {
    console.log('proxy success', args);
  },
  error(...args) {
    console.log('proxy error', args);
  },
});
