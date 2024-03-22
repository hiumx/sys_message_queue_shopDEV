const { consumerToQueue, consumerToQueueNormal, consumerToQueueFail } = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';

// consumerToQueue(queueName)
//     .then(() => {
//         console.log(`Message consumer started to queue:: ${queueName}`);
//     })
//     .catch(err => console.error(err));

consumerToQueueNormal()
    .then(() => {
        console.log(`Message consumer started to consumerToQueueNormal`);
    })
    .catch(err => console.error(err));

consumerToQueueFail()
    .then(() => {
        console.log(`Message consumer started to consumerToQueueFail`);
    })
    .catch(err => console.error(err));