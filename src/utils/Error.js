export default function responseError(res, statusCode, message) {
  if (res === null)
    return {
      statusCode,
      message: message ?? "Unknown Error",
    };

  const resMessage = message ?? "Unknown Error";
  res.statusMessage = resMessage;

  return res.status(statusCode).json({
    statusCode,
    message: resMessage,
  });
}
