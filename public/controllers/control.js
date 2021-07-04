var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jwt from 'jsonwebtoken';
import { validate } from "class-validator";
import User from '../entity/User.js';
import { getRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
//create an expiry date for our jwt token 1 day
const MAXAGE = 24 * 60 * 60 * 1000;
class MainControllers {
}
//sign a json web token
MainControllers.welcome = (req, res) => {
    res.send({ "text": "message" });
};
//render login view
MainControllers.loginGet = (req, res) => {
    res.render('login');
};
//logining with credentials
MainControllers.loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //login user
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(404).json({ message: "Not found !" });
        let userLoginRepository = getRepository(User);
        //find the user attempting to login via the database
        const findUser = yield userLoginRepository.findOne({ where: { email } });
        if (!findUser)
            return res.json({ code: 404, message: "user not found in our records" });
        //compare passwords
        let auth = yield bcrypt.compare(password, findUser.password);
        if (!auth)
            return res.status(401).json({ message: "invalid password" });
        //else login the user and create the token valid for one day
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "", {
            expiresIn: process.env.JWT_EXPIRES
        });
        return res.status(200).json({ message: "login successfully", token });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});
//render signup view
MainControllers.signUpGet = (req, res) => {
    res.render('signup');
};
//signing up with credentials
MainControllers.signUpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        //validate the input fields
        let errors = yield validate(newUser);
        console.log("errors are:", errors);
        if (errors.length > 0)
            return res.status(500).json({ message: errors });
        //generate the token
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "", {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.cookie('jwtoken', token, { maxAge: MAXAGE, signed: true, httpOnly: true });
        yield newUser.hashPassword();
        const dbRepository = getRepository(User);
        yield dbRepository.save(newUser);
        return res.status(201).send({ message: "user created", user: newUser, token: token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
    }
});
export default MainControllers;
//# sourceMappingURL=control.js.map