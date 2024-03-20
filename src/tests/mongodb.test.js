'use strict';

const { Types, model, Schema, default: mongoose } = require('mongoose');

const testSchema = new Schema({name: String});
const TestModel = model('Test', testSchema);

const connectString = 'mongodb://localhost:27017/shopDev';

describe('MongoDB connection', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectString);
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    it('should connect mongoose', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should save a document to mongoose', async () => {
        const user = await TestModel({name: 'Hiu'});
        await user.save();
        expect(user.isNew).toBe(false);
    });

    it('should find a document to mongoose', async () => {
        const user = await TestModel.findOne({name: 'Hiu'});
        expect(user).toBeDefined()
        expect(user.name).toBe('Hiu');
    });
})