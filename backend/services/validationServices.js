exports.validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!regex.test(password)) {
        return { valid: false, message: 'Password must be at least 6 characters long and contain both letters and numbers.' };
    }
    return { valid: true, message: '' };
};
