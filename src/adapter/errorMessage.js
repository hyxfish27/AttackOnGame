const toErrorMessage = (error) => {
    const errorMessage = error.response.data.message;

    return errorMessage;
};

const errorAdapter = {
    toErrorMessage,
};

export default errorAdapter;
