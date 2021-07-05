import "reflect-metadata";
import {createConnection} from "typeorm";
import User from "./entity/User.js";
import express from 'express';
import { router } from "./routes/routes.js";
import morgan from 'morgan';
import {config} from "dotenv"
config()

createConnection({
  type:"postgres",
  host: process.env.RDS_HOSTNAME,
  port: 5432,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  // database: "database-1",  
  entities: [
      User
  ],
  migrations:["migration/*.js"],
  cli:{
    migrationsDir:"migration"

  },
  synchronize: false,
  logging: false
}).then(connection => {
  // here you can start to work with your entities
    const app = express() 
    const PORT:string|number = process.env.PORT||3000
    app.use(express.json())       
    app.use(morgan('dev'))

    app.use('/',router)

    app.listen(PORT, ():void=> console.log(` Database connected and this app is running on port ${PORT}`))
  }).catch(error => console.error(error));
