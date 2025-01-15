import { processTask } from './processor/queueProcessor.js';
import { handleOutputTask } from './queues/output.js';
import { connectDB } from './config/dbConfig.js';

const startQueueProcessing = async () => {
    try {
        console.log('Starting queue processing...');
        connectDB();
        // Start the second queue processor
        processTask('output', handleOutputTask).catch((error) =>
            console.error('Error in queue2 processing:', error)
        );

    } catch (error) {
        console.error('Error starting queue processors:', error);
    }
};

// Initialize the queue processing
startQueueProcessing();
