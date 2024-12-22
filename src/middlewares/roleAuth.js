


module.exports = async (req, res, next) => {
    try {
        const role = req.user.role;
        if(role !== "ROLE_ADMIN") {
            return res.sendStatus(401);
        }
        next();
    }
    catch(e) {
        return res.sendStatus(401);
    }
}
