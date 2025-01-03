import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop({
        required: true,
        unique: true,
        validate: {
            validator: async function (value: string) {
                const user = await this.constructor.findOne({ email: value });
                return !user;
            }
        },
        message: 'Email already exists'
     })
    email: string;
    
    @Prop({default: Date.now, type: Date})
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);