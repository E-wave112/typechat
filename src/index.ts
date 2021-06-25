import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User.js";
import express from 'express';
import { router } from "./routes/routes.js";
import morgan from 'morgan';

createConnection().then(async connection => {
    const app = express() 
    const PORT:number = 3000
    app.use(express.json())
    app.use(morgan('dev'))

    app.use('/',router)

    app.listen(PORT, ():void=> console.log(`this app is running on port ${PORT}`))

    
}).catch(err => console.error(err))


// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
