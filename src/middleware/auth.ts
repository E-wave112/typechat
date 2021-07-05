import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from '../entity/User'

//enforce route protection


const requireAuthen = (req:Request,res:Response,next:NextFunction) => {
    let token:string = req.cookies.jwt
    if (!token){
        return res.redirect('/login')
    }else{
        jwt.verify(token,"SECRET",(err,decodedToken) => {
            if (err) res.redirect('/login')
            next()
        })
     
    }
}

const checkAuthen = (req:Request,res:Response,next:NextFunction) => {
    let token = req.cookies.jwt
    if (!token){
        next()
    }else {
        let decoded = jwt.verify(token,"SECRET")
        if (decoded) next()
        else next()
    }
}

export {requireAuthen,checkAuthen}