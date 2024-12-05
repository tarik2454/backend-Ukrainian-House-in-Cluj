// Интерфейс для объекта с кодами состояния и сообщениями
interface MessageList {
  [key: number]: string;
}

// Интерфейс для ошибки с кодом состояния
interface HttpError extends Error {
  status: number;
}

// Функция для создания ошибки с соответствующим статусом
const createHttpError = (
  status: keyof MessageList,
  message = messageList[status]
): HttpError => {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
};

// Объект с кодами состояния и сообщениями
const messageList: MessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

export default createHttpError;
