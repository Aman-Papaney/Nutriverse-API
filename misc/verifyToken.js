
import jwt from "jsonwebtoken"
import 'dotenv/config'

function verifyToken(req, res, next) {

    const token = req.headers.authorization

    if (token !== undefined) {

        try {
            jwt.verify(token.split(" ")[1], process.env.JWT_KEY, function (err, decoded) {
                if (!err) {
                    next()
                }
                else {
                    res.status(403).send({ message: "Error Occurred" })
                }
            })
        }
        catch (err) {
            res.status(403).send({ message: "Error Occurred" })
        }
    }
    else {
        res.status(203).send({ message: "Token Missing" })
    }
}

export default verifyToken