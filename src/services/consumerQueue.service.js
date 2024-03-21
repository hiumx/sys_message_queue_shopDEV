'use strict';

const { connectToRabbitMQ, consumerToQueue } = require("../dbs/init.rabbit");

const consumerService = {

    async consumerToQueue(queueName) {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consumerToQueue(channel, queueName);
        } catch (error) {
            console.error(error);
        }

    }
}

module.exports = consumerService;