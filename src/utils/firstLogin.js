import Account from "../models/Account.js"
import bcrypt from "bcrypt";
const firstLogin = async () => {
    const hashedPassword = await bcrypt.hash("admin20", 10);
    return  Account.create({
        name: "Admin User",
        email: "admin20@gmail.com",
        phone: "1234567890",
        password: hashedPassword,
        role: "admin",
        isFirstLogin: false,
    })
}
export default firstLogin;