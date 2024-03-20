'use strict';

const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:sa123456@localhost');
        if (!connection) throw new Error('Connect to RabbitMQ is not establish');

        const channel = await connection.createChannel();

        return { connection, channel };
    } catch (error) {
        console.error(error);
    }

}

const connectToRabbitMQForTest = async () => {
    try {
        const { connection, channel } = await connectToRabbitMQ();

        //publish message to queue
        const message = 'Hello RabbitMQ, I am Hiu';
        const queue = 'test-queue';
        await channel.assertQueue(queue, {
            durable: true
        });

        await channel.sendToQueue(queue, Buffer.from(message));

        //close the connection
        await connection.close();
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    connectToRabbitMQ, 
    connectToRabbitMQForTest
}