import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';


@Schema()
export class Alert extends Document {
    @Prop({ required: true })
    user_id: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    classname: string;

    @Prop({ required: true })
    alert_type: string;

    @Prop({ type:Date, required: true })
    start_date: Date; // Store as formatted string

    @Prop({ type:Date, required: true })
    end_date: Date; // Store as formatted string

    @Prop({ required: true })
    start_time: string; // Store as formatted string

    @Prop({ required: true })
    end_time: string;

    @Prop({ required: true })
    status: string;

    @Prop({ default: Date.now, type: Date })
    createdAt: Date;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);