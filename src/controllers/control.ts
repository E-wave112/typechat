import {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {validate} from "class-validator" 
import User from '../entity/User.js'
import {getManager,getRepository} from "typeorm"
import bcrypt from "bcryptjs"

//create an expiry date for our jwt token 1 day
const MAXAGE:number = 24 * 60 * 60 * 1000

class MainControllers {
        //sign a json web token
    static welcome = (req:Request,res:Response) => {
        res.send({"text":"message"})
    }

        //render login view
    static loginGet = (req:Request,res:Response) => {
        res.render('login')
    }
    //logining with credentials
    static loginPost = async (req:Request,res:Response) => {
    try {
        //login user
        let {email,password} = req.body
        if (!email || !password) return res.status(404).json({message:"Not found !"})
        let userLoginRepository = getRepository(User)
        //find the user attempting to login via the database
        const findUser = await userLoginRepository.findOne({where:{email}})
        if (!findUser) return res.json({code:404,message:"user not found in our records"})
        //compare passwords
        let auth = await bcrypt.compare(password, findUser.password);
        if (!auth) return res.status(401).json({message:"invalid password"})
        //else login the user and create the token valid for one day
        const token:string = jwt.sign({email},process.env.JWT_SECRET || "SECRET",{
            expiresIn:process.env.JWT_EXPIRES
        })
        return res.status(200).json({message:"login successfully",token})
    
    }
    
    catch (err) {
        console.error(err)
        res.status(500).send({message:err.message})
    }
}


    //render signup view
    static signUpGet = (req:Request,res:Response) => {
        res.render('signup')
    }

//signing up with credentials
    static signUpPost = async (req:Request,res:Response) => {
    try {
    let {email,password} = req.body
    const newUser = new User()
    newUser.email = email
    newUser.password = password
    
    //validate the input fields
    let errors = await validate(newUser)
    console.log("errors are:",errors)
    if (errors.length>0) return res.status(500).json({message:errors})
    //generate the token
    const token:string = jwt.sign({email},process.env.JWT_SECRET||"SECRET",{
        expiresIn:process.env.JWT_EXPIRES
    })
    res.cookie('jwtoken',token,{maxAge:MAXAGE,signed:true,httpOnly:true})
    await newUser.hashPassword()
    const dbRepository = getRepository(User)
    await dbRepository.save(newUser)
    return res.status(201).send({message:"user created",user:newUser,token:token})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:err.message});
    }
  }

  static signOut = (req:Request,res:Response) => {
      res.cookie('jwt','',{httpOnly:true,maxAge:1})
      return res.redirect('/')
  }
}

export default MainControllers;