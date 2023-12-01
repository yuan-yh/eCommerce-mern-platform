// take a argument `fn`: an asynchronous function (such as an Express route handler)
// return a new function that takes the standard Express route handler arguments (`req`, `res`, `next`)
const asyncHandler = fn => (req, res, next) => {
    // If the promise returned by fn(req, res, next) cannot be resolved successfully (rejected), the .catch(next) part will be executed. 
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;