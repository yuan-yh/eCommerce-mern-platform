// It will be called if no other middleware handles the request.
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalURL}`);
    res.status(404);
    next(error);
};

// overwrite the default error handler
const errorHandler = (err, req, res, next) => {
    // if the status code is 200, change to 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check for the Mongoose bad ObjectId error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };
