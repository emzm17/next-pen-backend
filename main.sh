#!/bin/bash

export R2_URL="$R2_URL"

# Download the file from R2_URL and save it to /home/dibya/app
wget "$R2_URL" -P /home/dibya/app

# Check if the download was successful
if [ $? -eq 0 ]; then
    echo "Download completed successfully."

    # Now run the run.sh script
    exec /bin/bash run.sh
else
    echo "Download failed. Exiting..."
    exit 1
fi
