import bcrypt from 'bcrypt';

// Converting a regular password to a hashedPassword for security purpose
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;       
    } 
    catch (error) {
        console.error(error);
    }
};

// Compare the password with hashedPassword for user authorization
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}