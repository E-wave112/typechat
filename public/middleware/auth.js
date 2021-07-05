import jwt from "jsonwebtoken";
//enforce route protection
const requireAuthen = (req, res, next) => {
    let token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/login');
    }
    else {
        jwt.verify(token, "SECRET", (err, decodedToken) => {
            if (err)
                res.redirect('/login');
            next();
        });
    }
};
const checkAuthen = (req, res, next) => {
    let token = req.cookies.jwt;
    if (!token) {
        next();
    }
    else {
        let decoded = jwt.verify(token, "SECRET");
        if (decoded)
            next();
        else
            next();
    }
};
export { requireAuthen, checkAuthen };
//# sourceMappingURL=auth.js.map