export default function promiseMiddleware() {
  console.log("PROMISE MIDDLE")
  return (next) => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    console.log(REQUEST);
    console.log(SUCCESS);
    console.log(FAILURE);

    next({ ...rest, type: REQUEST });
    return promise.then(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => next({ ...rest, error, type: FAILURE })
    );
  };
}
