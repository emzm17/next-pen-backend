#!/bin/bash

export REDIS_HOST="$REDIS_HOST"
export REDIS_PORT="$REDIS_PORT"
TOPIC_NAME="UPDATE_RESULT"

# Define directories and files
OUTPUT_DIR="/home/dibya/app"
C_CPP_FILE="$OUTPUT_DIR/example.cpp"
OUTPUT_FILE="$OUTPUT_DIR/example"
INPUT_FILE="$OUTPUT_DIR/in.txt"
FINAL_OUTPUT="$OUTPUT_DIR/output.log"
ENCODED_OUTPUT="$OUTPUT_DIR/output_base64.log"



# Ensure the output files are empty at the start
> "$FINAL_OUTPUT"
> "$ENCODED_OUTPUT"

# Function to compile C++ code
compile_cpp() {
    g++ -o "$OUTPUT_FILE" "$C_CPP_FILE" 2> "$FINAL_OUTPUT"

    if [ $? -ne 0 ]; then
        echo "Compilation failed. Printing error output..."
        cat "$FINAL_OUTPUT"  # Print error in readable format
    
        base64 "$FINAL_OUTPUT" > "$ENCODED_OUTPUT"
        insert_into_redis "ERROR"  # Store failure flag
        exit 1
    fi
}

# Function to run the compiled program and capture output
run_cpp_and_capture_output() {
    # "$OUTPUT_FILE" < "$INPUT_FILE" > "$FINAL_OUTPUT" 2> "$FINAL_OUTPUT"
    if [ -f "$INPUT_FILE" ]; then
    "$OUTPUT_FILE" < "$INPUT_FILE" > "$FINAL_OUTPUT" 2>&1
    else
    "$OUTPUT_FILE" > "$FINAL_OUTPUT" 2>&1
    fi

    if [ $? -ne 0 ]; then
        echo "Execution failed. Encoding error output..."
        base64 "$FINAL_OUTPUT" > "$ENCODED_OUTPUT"
        insert_into_redis "ERROR"  # Store failure flag
        exit 1
    fi
}

# Function to insert Base64-encoded content into MySQL with flag
insert_into_redis() {
local status_flag="$1"
BASE64_CONTENT=$(cat "$ENCODED_OUTPUT")

# Create a JSON message
MESSAGE=$(jq -n --arg id "$PROJECT_ID" --arg status "$status_flag" --arg result "$BASE64_CONTENT" \
'{id: $id, status: $status, result: $result}')

# Publish to Redis topic
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" PUBLISH "$TOPIC_NAME" "$MESSAGE"

echo "Base64 output with status [$status_flag] published to Redis topic [$TOPIC_NAME] as JSON."

}

# Execute functions
compile_cpp
run_cpp_and_capture_output

# Convert final output to Base64 and store it
base64 "$FINAL_OUTPUT" > "$ENCODED_OUTPUT"

# Insert Base64-encoded output with "FLG" for success
insert_into_redis "COMPLETED"

echo "Execution successful. Base64 output saved in $ENCODED_OUTPUT and stored in MySQL."
