import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';

type time_range = {
    start_time: string;
    end_time: string;
}

type date_range = {
    start_date: Date;
    end_date: Date;
}

@Schema()
export class Alert extends Document {
    @Prop({ required: true })
    user_id: ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    classname: string;

    @Prop({ required: true })
    alert_type: string;

    @Prop({ required: true })
    time_range: time_range;

    @Prop({ required: true })
    date_range: date_range;

    @Prop({ required: true })
    status: string;

    @Prop({ default: Date.now, type: Date })
    createdAt: Date;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);