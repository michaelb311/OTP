const bcrypt = require('bcrypt');


const createHashedOTP = async () => {
    const rawOTP = Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(rawOTP.toString(), salt);
    
    return {rawOTP, hashedOTP};
};

module.exports = createHashedOTP;

