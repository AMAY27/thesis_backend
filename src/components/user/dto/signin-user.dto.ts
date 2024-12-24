import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninUserDto {
    @ApiProperty()
    @IsEmail({}, {message: 'Invalid email format'})
    email: string;
    
    @ApiProperty()
    @IsNotEmpty({message: 'Password cannot be empty'})
    @IsString({message: 'Password must be a string'})
    password: string;
}