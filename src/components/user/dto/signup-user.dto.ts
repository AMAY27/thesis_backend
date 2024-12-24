import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Username cannot be empty'})
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({message: 'Password must be a string'})
    password: string;

    @ApiProperty()
    @IsEmail({}, {message: 'Invalid email format'})
    email: string;
}   