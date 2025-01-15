import { redisClient } from '../config/redisConfig.js';


async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log(`Connected to Redis`);
    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}
async function disconnectFromRedis() {
    try {
        await redisClient.disconnect();
        console.log('Disconnected from Redis.');
    } catch (error) {
        console.error('Error disconnecting from Redis:', error);
    }
}


export const processTask = async (queueName, taskHandler) => {
    try {
        await connectToRedis();
        while (true) {
            try {
                const result = await redisClient.brPop(queueName, 0);
                try {
                    const task = JSON.parse(result.element);
                    taskHandler(task)
                } catch (parseError) {
                    console.error('Failed to parse task', parseError);
                    continue;
                }

            } catch (innerError) {
                console.error('Error processing individual task:', innerError);
            }
        }
    } catch (error) {
        console.error('Error setting up task processor:', error);
    } finally {
        await disconnectFromRedis();
    }
}