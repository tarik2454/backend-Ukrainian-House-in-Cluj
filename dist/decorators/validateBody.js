import HttpError from '../helpers/HttpError.ts';
export default function validateBody(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    };
}
