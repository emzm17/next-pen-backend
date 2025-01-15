
import { processTask } from './processor/queueProcessor.js';
import { handleQueueTask } from './queues/code.js';


const startQueueProcessing = async () => {
    try {
        console.log('Starting queue processing...');

        // Start the first queue processor
        processTask("codeQueue", handleQueueTask).catch((error) =>
            console.error('Error in queue1 processing:', error)
        );

    } catch (error) {
        console.error('Error starting queue processors:', error);
    }
};

// Initialize the queue processing
startQueueProcessing();
