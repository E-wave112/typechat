import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {isEmail} from "class-validator"
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type:"varchar",unique:true,nullable:false})
    email: string;

    @Column({nullable:false})
    password: string;

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    constructor(id:string,email:string,password:string,age:number,created:Date,updated:Date){
        this.id= id;
        this.email = email;
        this.password = password;
        this.createdAt = created;
        this.updatedAt = updated
    }
    //create a hashpassword method
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

        //chheck the validity of an old password before it is changed
        checkIfOldPasswordIsValid(unencryptedPassword: string) {
            return bcrypt.compareSync(unencryptedPassword, this.password);
          }
}
