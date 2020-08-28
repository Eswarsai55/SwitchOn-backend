const responseHandler = {
	errorResponse: (status, message) => {
    const data = {};
    data.error = {
      status,
      message,
    }
    return {
      data,
    }
  },
	sucessResponse: (status, succMessage, data) => {
    return {
      status,
      message: succMessage,
      data
    }
  },
};

export default responseHandler;