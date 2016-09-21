function runFn(fn, args, next, stopAtError, done) {
  const ret = fn(stopAtError ? args[1] : args[0]);
  if (ret && ret.then) {
    ret.then((ok) => {
      if (stopAtError === false) {
        done(null, ok);
      } else {
        next([null, ok]);
      }
    }, (error) => {
      if (stopAtError) {
        done(error, null);
      } else {
        next(error, null);
      }
    });
  } else {
    next([null, ret]);
  }
}

function chainPromise(fns, arg, done, stopAtError = true) {
  fns = fns.filter(f => !!f);
  if (!fns.length) {
    const args = stopAtError ? [null, arg] : [arg];
    return done(...args);
  }

  let index = -1;

  function next(ret) {
    index++;
    if (index < fns.length) {
      const args = stopAtError ? [null, arg] : [arg];
      runFn(fns[index], index === 0 ? args : ret, next, stopAtError, done);
    } else {
      done(...ret);
    }
  }

  next();
}

export default chainPromise;
