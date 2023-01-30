import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


export class AuthController{


    async auth(req: Request, res: Response) {
        const {email, password} = req.body

        const user = await prisma.user.findUnique({where: {email}})
        
        if(!user) {
            return res.json({error: "User not found"})
        }

        const isValuePassword = await compare(password, user.password)
        if(!isValuePassword)
        {
            return res.json({error: "password invalid"})
        }
        
        

        const token = sign({id: user.id}, "supersecrethash" , {expiresIn: "1d"})
        const id = {id: user.id}        

        return res.json({user: {email, id}, token})
    }

}