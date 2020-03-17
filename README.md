Pigeon Weather
===========================

A small Node.js and express application with a SQLite databased that collects 
user information and display their current weather. This well be used as the 
starter for a [Courier](https://trycourier.com) Sample Application. Notifications 
will be added using Courier and several channel providers like [Twilio](https://www.twilio.com/) 
for SMS and [SendGrid](https://sendgrid.com/) for email.

## Remix this Project
Create your own copy of this project using the button below.
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/pigeon-weather)
### Environment Variables
This project uses 2 environment variables that you'll need to supply values for in the `.env` file.
* `COURIER_AUTH_TOKEN` - Get this by signing up for a [free Courier Account](https://www.trycourier.app/register).
* `OPENWEATHER_API_KEY` - Get this by signing up for a [free OpenWeather Account](https://home.openweathermap.org/users/sign_up).