function logout(setToken) {
    setToken('');
    localStorage.removeItem('token');
}

export {
    logout
}