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
    },

    async consumerToQueueNormal() {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationQueue = 'notificationQueueProcess';

            // const timeExpire = 5000;
            // setTimeout(async () => {
            //     await channel.consume(notificationQueue, msg => {
            //         console.log('Message received by normal process: ', msg.content.toString());
            //     }, {
            //         noAck: true
            //     });
            // }, timeExpire);

            await channel.consume(notificationQueue, msg => {
                try {
                    const numberRandom = Math.random();
                    console.log({ numberRandom });
                    if(numberRandom < 0.8) {
                        throw new Error('Error occur when send notification => HOT FIX');
                    } 
                    console.log('Message received by normal process: ', msg.content.toString());
                } catch (error) {
                    channel.nack(msg, false, false);
                }
            })

        } catch (error) {
            console.error(error);
        }
    },

    async consumerToQueueFail() {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationExDLX = 'notificationExDLX';
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
            const notificationQueueHandler = 'notificationQueueHotFix';

            await channel.assertExchange(notificationExDLX, 'direct', {
                durable: true
            });

            const queueResult = await channel.assertQueue(notificationQueueHandler, {
                exclusive: false
            });

            await channel.bindQueue(queueResult.queue, notificationExDLX, notificationRoutingKeyDLX);

            await channel.consume(queueResult.queue, msgFail => {
                console.log(`Message fail!, Please hot fix:: ${msgFail.content.toString()}`);
            }, {
                noAck: true
            })

        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = consumerService;