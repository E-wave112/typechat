//sign a json web token
const welcome = (req, res) => {
    res.send({ "text": "message" });
};
//render login view
const loginGet = (req, res) => {
    res.render('login');
};
//render signup view
const signUpGet = (req, res) => {
    res.render('signup');
};
export { welcome, loginGet, signUpGet };
