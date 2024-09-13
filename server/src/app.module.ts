import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: "6d"
      }
    }),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { };