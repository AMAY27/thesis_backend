import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async signUp(
        userDto: SignupUserDto,
    ): Promise<{ message: string , statusCode: number}> {
        try {
            const hashedPassword = await bcrypt.hash(userDto.password, 10);
            const newUser = new this.userModel({
                ...userDto,
                password: hashedPassword,
            });
            await newUser.save();
            return { 
                message: 'User created successfully', 
                statusCode: HttpStatus.CREATED, 
            };
        } catch (error) {
            this.logger.error(`Error while sign up: ${error.message}`);
            if (error.name === 'ValidationError' && error.errors.email.message) {
                throw new HttpException(
                    'Email already exists',
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw error;
        }
    }
        
}