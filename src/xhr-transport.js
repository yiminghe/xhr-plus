import utils from './utils';
import assign from 'object-assign';
import IO from './base';
import XhrTransportBase from './xhr-transport-base';
import SubDomainTransport from './sub-domain-transport';

// express: subdomain offset
function isSubDomain(hostname) {
  // phonegap does not have document.domain
  return document.domain && utils.endsWith(hostname, document.domain);
}

function XhrTransport(io) {
  const c = io.config;
  const crossDomain = c.crossDomain;
  const useSubDomainProxy = c.useSubDomainProxy;
  this.io = io;
  if (useSubDomainProxy && crossDomain &&
    (!XhrTransportBase.supportCORS || useSubDomainProxy === 'force')) {
    // 跨子域
    if (isSubDomain(c.uri.hostname)) {
      // force to not use sub domain transport
      if (useSubDomainProxy) {
        return new SubDomainTransport(io);
      }
    }
  }

  this.nativeXhr = XhrTransportBase.nativeXhr(crossDomain);
  return this;
}

assign(XhrTransport.prototype, XhrTransportBase.proto, {
  send() {
    this.sendInternal();
  },
});

IO.setupTransport('*', XhrTransport);
/*
 2012-11-28 note ie port problem:
 - ie 的 xhr 可以跨端口发请求，例如 localhost:8888 发请求到 localhost:9999
 - ie iframe 间访问不设置 document.domain 完全不考虑 port！
 - localhost:8888 访问 iframe 内的 localhost:9999

 CORS : http://www.nczonline.net/blog/2010/05/25/cross-domain-io-with-cross-origin-resource-sharing/
 */
