const db = require('../../../models');
const User = db.User;



async function login(req, res){
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (user.password !== password) {
            return res.status(401).json({ message: "Wrong password" });
        }

        res.status(200).json({ message: "Login success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    login
}
