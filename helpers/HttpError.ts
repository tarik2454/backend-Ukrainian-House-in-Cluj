interface MessageList {
  [key: number]: string;
}

interface HttpError extends Error {
  status: number;
}

export const HttpError = (
  status: keyof MessageList,
  message = messageList[status]
): HttpError => {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
};

const messageList: MessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};


