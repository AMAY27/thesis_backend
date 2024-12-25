import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    @ApiOperation({ 
        summary: 'Sign up',
        description: 'Sign up a new user',
    })
    async signUp(@Body() signUpUserDto: SignupUserDto) {
        this.logger.log(`Signing up the user`);
        return await this.userService.signUp(signUpUserDto);
    }

    @Post('signin')
    @ApiOperation({ 
        summary: 'Sign in',
        description: 'Sign in a user',
    })
    async signIn(@Body() signInUserDto: SigninUserDto) {
        this.logger.log(`Signing in the user`);
        return await this.userService.signIn(signInUserDto);
    }
}