import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: User.name,
      async useFactory() {

        const schema = UserSchema;

        schema.pre("save", async function () {

          if (this.isModified("password")) {

            this.password = await bcrypt.hash(this.password, 10);

          }

        });

        return schema;

      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { };