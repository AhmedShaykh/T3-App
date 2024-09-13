import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtSerive: JwtService) { };

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request: Request = context.switchToHttp().getRequest();

        const authToken = request.headers["authorization"] || "";

        if (!authToken || !authToken.startsWith("Bearer")) {
            throw new UnauthorizedException("Please Login First");
        }

        const token = authToken.split(" ")[1];

        if (!token) {
            throw new UnauthorizedException("Token Not Valid");
        }

        try {

            const payload = this.jwtSerive.verifyAsync(token, {
                secret: process.env.JWT_KEY
            });

            request["user"] = payload;

        } catch (error) {

            throw new UnauthorizedException();

        }

        return true;

    };

};