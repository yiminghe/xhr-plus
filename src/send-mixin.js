export default {
  callBeforeSendInternal() {
    const io = this.io;
    const c = io.config;
    if (c.beforeSendInternal) {
      c.beforeSendInternal.call(c.context, this, c);
    }
  },

  // 由 io.abort 调用，自己不可以调用 io.abort
  abort() {
    this._callback(0, 1);
  },
};
