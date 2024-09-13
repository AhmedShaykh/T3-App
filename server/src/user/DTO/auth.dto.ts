import { IsEmail, IsNotEmpty } from "class-validator";

export class Register {
    @IsNotEmpty({ message: "Name Is Required" })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: "Email Is Required" })
    email: string;

    @IsNotEmpty({ message: "Password Is Required" })
    password: string;
};

export class Login {
    @IsEmail()
    @IsNotEmpty({ message: "Email Is Required" })
    email: string;

    @IsNotEmpty({ message: "Password Is Required" })
    password: string;
};

export class UpdateData {
    @IsEmail()
    @IsNotEmpty({ message: "Email Is Required" })
    email: string;

    @IsNotEmpty({ message: "Name Is Required" })
    name: string;
};

export class ChangePassword {
    @IsNotEmpty({ message: "New Password Is Required" })
    new_password: string;

    @IsNotEmpty({ message: "Old Password Is Required" })
    old_password: string;
};

export class ResetPassword {
    @IsNotEmpty({ message: " Password Is Required" })
    password: string;

    @IsNotEmpty({ message: "Confirm Password Is Required" })
    c_password: string;
};