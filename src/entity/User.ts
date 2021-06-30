import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";
import {isEmail} from "class-validator"
import * as bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity{
    
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

    // constructor(id:string,email:string,password:string,created:Date,updated:Date){
    //     this.id= id;
    //     this.email = email;
    //     this.password = password;
    //     this.createdAt = created;
    //     this.updatedAt = updated
    // }
    //create a hashpassword method
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}
