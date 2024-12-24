import { User } from "../schemas/user.schema";
import { UserResponseDto } from "../dto/user-response.dto";

export function convertUserToDto(user: User): UserResponseDto {
    return {
        userId: user._id.toString(),
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
    };
}