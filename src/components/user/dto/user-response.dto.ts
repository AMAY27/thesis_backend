import { Date } from "mongoose";

export class UserResponseDto {
    userId: string;
    email: string;
    username: string;
    createdAt: Date;
}