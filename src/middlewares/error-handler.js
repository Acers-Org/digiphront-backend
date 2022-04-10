import { CustomAPIError } from "../utils/custom-error.js";

const errorResponse = (res, statusCode, msg) =>
  res.status(statusCode).json({ message: msg, success: 0 });

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return errorResponse(res, err.statusCode, err.message);
  } else if (err.name === "ValidationError") {
    let msg = "";
    Object.keys(error.errors).forEach((key) => {
      msg += error.errors[key].message + ".";
    });

    return errorResponse(res, 400, msg);
  }
  return errorResponse(res, 500, "Something went wrong, please try again");
};

export default errorHandlerMiddleware;
