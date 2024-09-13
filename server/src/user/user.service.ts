import { ChangePassword, Login, Register, ResetPassword, UpdateData } from "./DTO/auth.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtSerice: JwtService
    ) { };

    async register(data: Register) {

        const existingUser = await this.userModel.findOne({ email: data.email.toLowerCase() });

        if (existingUser) {
            throw new BadRequestException("User Already Exist");
        }

        const user = await this.userModel.create({
            email: data.email,
            password: data.password,
            name: data.name
        });

        const token = await this.jwtSerice.sign({ userId: user._id });

        return {
            message: "Register Successfully",
            token: token
        };

    };

    async login(data: Login) {

        const existingUser = await this.userModel.findOne({ email: data.email.toLowerCase() });

        if (!existingUser) {
            throw new BadRequestException("User Not Exist");
        }

        const isMatch = await bcrypt.compare(data.password, existingUser.password);

        if (!isMatch) {
            throw new BadRequestException("Invalid Credentials");
        }

        const token = await this.jwtSerice.sign({ userId: existingUser._id });

        return {
            message: "Login Successfully",
            token: token
        };

    };

    async profileView(id: string) {

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new BadRequestException("User Not Exist");
        }

        return user;

    };

    async updateProfile(id: string, data: UpdateData) {

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new BadRequestException("User Not Exist");
        }

        await this.userModel.findByIdAndUpdate(id, {
            email: data.email,
            name: data.name
        });

        return {
            message: "Update Data Successfully"
        };

    };

    async changePassword(id: string, data: ChangePassword) {

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new BadRequestException("User Not Exist");
        }

        const isMatch = await bcrypt.compare(data.old_password, user.password);

        if (!isMatch) {
            throw new BadRequestException("Password Does Not Match With Old Password");
        }

        const hash = await bcrypt.hash(data.new_password, 10);

        await this.userModel.findByIdAndUpdate(id, {
            password: hash
        });

        return {
            message: "Password Change Successfully"
        };

    };

    async ValidateResetPasswordToken(data: { email: string, userId: string }) {
        return data.email;
    };

    async Resetpassword(data: { email: string, userId: string }, body: ResetPassword) {

        const user = await this.userModel.findById(data.userId);

        if (!user) {
            throw new BadRequestException("Account Not Found");
        }

        if (body.c_password !== body.password) {
            throw new BadRequestException("Password & Confirm Password Does Not Match");
        }

        const isMatch = await bcrypt.compare(body.password, user.password);

        if (isMatch) {
            throw new BadRequestException("Do Not Try Old Passwords Try New");
        }

        const hash = await bcrypt.hash(body.password, 10);

        await this.userModel.findByIdAndUpdate(data.userId, {
            password: hash
        });

        return {
            message: "Password Reset Successfully"
        };

    };

};