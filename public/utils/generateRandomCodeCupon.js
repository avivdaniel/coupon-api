const generateRandomCodeCupon = () => {
    return Math.random().toString(20).substr(2, 6);
}

module.exports = generateRandomCodeCupon;