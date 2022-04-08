import { CustomAPIError } from "../utils/custom-error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: 0,
    });
  }
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again", success: 0 });
};

export default errorHandlerMiddleware;
