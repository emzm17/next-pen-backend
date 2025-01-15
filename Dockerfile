# Use an official Ubuntu base image
FROM ubuntu:latest

# Set environment variables to make the installation non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install g++, make, and other necessary tools
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    build-essential \
    curl \
    gnupg \
    jq \
    redis-tools \
    wget \
    git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


ARG REDIS_HOST
ARG REDIS_PORT    

ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}

# Set up a user with limited permissions for running the code (sandboxing)

# Set the working directory inside the container
WORKDIR /home/dibya/app

# Copy the scripts into the container and make them executable
COPY run.sh main.sh  ./
RUN chmod +x main.sh run.sh

# Specify the command to run the compiled program
ENTRYPOINT ["/bin/bash", "/home/dibya/app/main.sh"]
