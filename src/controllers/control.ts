import {Request,Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {validate} from "class-validator"
import {User} from '../entity/User.js'
import {getManager} from "typeorm"

//sign a json web token
const welcome = (req:Request,res:Response) => {
    res.send({"text":"message"})
}


//render login view
const loginGet = (req:Request,res:Response) => {
    res.render('login')
}

//render signup view
const signUpGet = (req:Request,res:Response) => {
    res.render('signup')
}

export {welcome,loginGet,signUpGet}