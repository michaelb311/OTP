Express App with Google OAuth 2.0 and Postgres

This is a simple express app that uses Google OAuth 2.0 for authentication and a Postgres database to store user information.

PREQUISITES

To run this app, you will need the following:

Node.js and npm

A Google Developers Console account and a project with the Google+ API enabled

A Postgres database

INSTALLATION 

To install this app, follow these steps:

Clone this repository

Install the dependencies using npm install

Create a .env file with the following environment variables:

PORT = 3000: The default port for the local environment.

SESSION_SECRET:  Secret Key for storing user session data

GOOGLE_CLIENT_ID: The client ID for your Google OAuth app

GOOGLE_CLIENT_SECRET: The client secret for your Google OAuth app

DB_HOST: The hostname of your Postgres database

DB_USER: The username for your Postgres database

DB_PASSWORD: The password for your Postgres database

DB_NAME: The name of your Postgres database

MAILGUN_API_KEY: The API Key for mailgun your mailgun account

MAILGUN_DOMAIN: The domain name for your mailgun account

Run the app using npm run dev

USAGE

To use this app, visit http://localhost:3000 in a web browser. You will be able to log in using your Google account and presented a Two Factor Authentication form in order to have access to the data that is stored in the Postgres database.
