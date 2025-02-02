# Bootree Bots

Bootree Bots is a microservice for handling moderation requests for Twitch and Nightbot using OpenAI and Twitch API.

## Overview

This project provides an API for processing moderation requests and optionally responding via Twitch chat.

## Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:ecuation/bootree-bots.git bots
    cd bots
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    MONGO_URI=your_mongo_uri
    MODERATION_ACTIVE=true
    ```

4. Run tests
    ```sh 
    npm run test
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

There is swagger documentation in path to view an test endpoints `http:localhost:3000/api/bots/api-docs`