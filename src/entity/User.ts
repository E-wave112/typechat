import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";
import {isEmail} from "class-validator"
import bcrypt from "bcryptjs";

@Entity()
export default class User extends BaseEntity{
    
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
    //hash password method before saving to db
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,10);
        return this.password
    }
    
}
