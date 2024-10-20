export const showSuccessToast = (toast, title, description = '') => {
    toast({
        title,
        description,
        status: 'success',
        duration: 2000,
    });
};

export const showErrorToast = (toast, title, description = '') => {
    toast({
        title,
        description,
        status: 'error',
        isClosable: true,
        duration: 5000,
    });
};