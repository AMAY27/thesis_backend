// filepath: /c:/Users/amay rajvaidya/Desktop/thesis_backend/backend-api/src/scripts/import-csv.ts
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { Event } from '../components/alert/schemas/event.schema';

async function importCSV() {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/Thesis-database');

    const eventModel = mongoose.model('Event', new mongoose.Schema({
        index: Number,
        Datetime: Date,
        Datetime_2: Date,
        Confidence: Number,
        Klassenname: String,
        time: String,
    }));

    const results = [];
    const BATCH_SIZE = 1000;

    const stream = fs.createReadStream('july_data.csv')
        .pipe(csv())
        .on('data', (data) => {
            // Convert date strings to Date objects
            const formattedData = {
                ...data,
                Datetime: moment(data.Datetime, 'DD-MM-YYYY HH:mm').toDate(),
                Datetime_2: moment(data.Datetime_2, 'DD-MM-YYYY HH:mm').toDate(),
                new_date: moment(data.new_date, 'DD-MM-YYYY HH:mm').toDate(),
            };
            results.push(formattedData);

            if (results.length >= BATCH_SIZE) {
                stream.pause();
                eventModel.insertMany(results)
                    .then(() => {
                        results.length = 0; // Clear the array
                        stream.resume();
                    })
                    .catch((err: any) => {
                        console.error('Error inserting batch:', err);
                        stream.resume();
                    });
            }
        })
        .on('end', async () => {
            // Insert remaining data
            if (results.length > 0) {
                await eventModel.insertMany(results);
            }
            console.log('Data imported successfully');
            mongoose.connection.close();
        });
}

importCSV().catch(err => {
    console.error('Error importing CSV:', err);
    mongoose.connection.close();
});