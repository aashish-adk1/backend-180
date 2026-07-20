import { registerUserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory"
            })
        }
        const user = await registerUserService({ fullName, email, password, role });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        })
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}