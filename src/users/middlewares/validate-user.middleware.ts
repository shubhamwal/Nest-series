import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request, Response } from "express";

@Injectable()
export class ValidateUserMiddleware implements 
NestMiddleware{
        use(req: Request,res: Response, next:NextFunction){ 
            console.log("Hello World")
            const { authorization } = req.headers;
            console.log("fdgvgfxd",authorization)
            if (!authorization) return res
            .status(403)
            .send({error:"No authentication token provided"})
            next();
            if (authorization === "123"){
            next();
            }else{
            return res
            .status(403)
            .send({error:'Invalid authentication Token Provided.'})
            }
    }
}