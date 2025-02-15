#!/bin/bash
export PROJECT_ID="$PROJECT_ID"
export REDIS_HOST="$REDIS_HOST"
export REDIS_PORT="$REDIS_PORT"

# Define variables
OUTPUT_DIR="/home/dibya/app"          # Directory where the C++ code and output will reside
C_CPP_FILE="$OUTPUT_DIR/example.cpp"  # C++ source file in the output directory
OUTPUT_FILE="$OUTPUT_DIR/example"     # Output executable file
INPUT_FILE="$OUTPUT_DIR/in.txt"        # Input file to be provided to C++ program
REDIS_QUEUE="output"      # Redis channel to push logs
# Redis server host
               


IN_QUEUE=1
COMPILING=2
COMPILED=3
OUTPUT=4
EXCECUTED=5
ERROR_COMPILING=6




# Function to compile C++ code from /output directory
compile_cpp() {
    echo "Compiling C++ code from $C_CPP_FILE..."
    send_custom_log "Compiling C++ code" "$PROJECT_ID" "$COMPILING" # Send compiling log to Redis

    # Try compiling and capture the error log
    g++ -o "$OUTPUT_FILE" "$C_CPP_FILE" 2> compile_error.log
    if [ $? -ne 0 ]; then
        echo "Error compiling C++ code. Check compile_error.log for details."
        
        # Read the compile error log and send it to Redis
        while IFS= read -r line; do
            send_custom_log "$line" "$PROJECT_ID" "$ERROR_COMPILING"
        done < compile_error.log

        exit 1
    fi

    echo "C++ code compiled successfully."
    send_custom_log "C++ code compiled successfully." "$PROJECT_ID" "$COMPILED" # Send success log to Redis
}

# Function to send custom logs to Redis with Project ID
send_custom_log() {
    local log_message="$1" # first position of parameter
    local project_id="$2"  # second position of parameter
    local status_id="$3"

    # Create JSON formatted log message
    local formatted_log=$(jq -n --arg projectId "$project_id" --arg logMessage "$log_message"  --arg statusId "$status_id" \
    '{projectId: $projectId, status: $logMessage , statusId:$statusId}')
    
    echo "Sending log to Redis: $formatted_log"
    redis-cli -h "$REDIS_HOST" -p $REDIS_PORT LPUSH "$REDIS_QUEUE" "$formatted_log"

}


# Function to send content of a text file to Redis
send_file_to_redis() {
    local file_path="$1"
    
    # Read the file line by line and send its content to Redis
    while IFS= read -r line; do
        send_custom_log "$line" "$PROJECT_ID" "$OUTPUT" # Send each line of the file to Redis
    done < "$file_path"
}

# Function to run the C++ program and push logs and output to Redis
run_cpp_and_push_logs() {
    # Check if the compiled C++ file exists
    if [ ! -f "$OUTPUT_FILE" ]; then
        echo "Error: C++ program not compiled. Exiting..."
        send_custom_log "Error: C++ program not compiled. Exiting..." "$PROJECT_ID"  "$ERROR_COMPILING" # Send error log to Redis
        exit 1
    fi

    # Run the C++ program with input from file and capture both stdout and stderr
    echo "Running C++ program with input from $INPUT_FILE..."
    "$OUTPUT_FILE" < "$INPUT_FILE" > output.log 2>&1

    # Send the logs of the program execution to Redis
    send_file_to_redis "output.log"

    # Send success message to Redis
    echo "C++ program executed successfully."
    send_custom_log "C++ program executed successfully." "$PROJECT_ID" "$EXCECUTED" # Send success log to Redis

    # Clean up the output log file
    # rm -f output.log
}

# Main logic
compile_cpp
run_cpp_and_push_logs
