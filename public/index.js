import "reflect-metadata";
import express from 'express';
import { router } from "./routes/routes.js";
import morgan from 'morgan';
import * as mysql from "mysql";
import { config } from "dotenv";
config();
let connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: Number(process.env.RDS_PORT) || 3306,
    timeout: 60000
});
connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/', router);
    app.listen(PORT, () => console.log(` Database connected and this app is running on port ${PORT}`));
    console.log('Connected to database.');
    connection.end();
});
// createConnection().then(async connection => {
//     const app = express() 
//     const PORT:string|number = process.env.PORT||3000
//     app.use(express.json())
//     app.use(morgan('dev'))
//     app.use('/',router)
//     app.listen(PORT, ():void=> console.log(` Database connected and this app is running on port ${PORT}`))
// }).catch(err => console.error(err))
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
