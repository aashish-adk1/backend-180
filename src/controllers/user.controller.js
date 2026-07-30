import { registerUserService, loginUserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory"
            })
        }
        const { user, token } = await registerUserService({ fullName, email, password, role });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user,
            token: token
        })
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            })
        }
        const { user, token } = await loginUserService({  email, password });
        res.status(200).json({
            success: true,
            message: "User loggedIn successfully",
            user,
            token
        })
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}