# Pigeon Weather

A small Node.js and express application with a SQLite databased that collects
user information and display their current weather. This well be used as the
starter for a [Courier](https://trycourier.com) Sample Application. Notifications
will be added using Courier and several channel providers like [Twilio](https://www.twilio.com/)
for SMS, [SendGrid](https://sendgrid.com/) for email, and [Slack](https://slack.com/) for direct messaging.

Follow [@trycourier on Twitch](https://twitch.tv/trycourier) to be notified of future live streams.

## Remix this Project

Create your own copy of this project using the button below.
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/pigeon-weather)

### Environment Variables

This project uses 2 environment variables that you'll need to supply values for in the `.env` file.

- `COURIER_AUTH_TOKEN` - Get this by signing up for a [free Courier Account](https://www.trycourier.app/register).
- `OPENWEATHER_API_KEY` - Get this by signing up for a [free OpenWeather Account](https://home.openweathermap.org/users/sign_up).
- `SLACK_BOT_TOKEN` - Get this from your [Slack Application](https://api.slack.com/apps)

## Running locally

This project was created to run in Glitch, but can be run locally with these additional steps.

1. Clone the repo at https://github.com/trycourier/pigeon-weather
1. In the repo directory, run `npm install`
1. Create the database by running `mkdir .data && touch .data/database.sqlite`
1. Create a `.env` file and add the variables from above.
1. Start the application by running `npm start`
1. Open a browser to http://localhost:58428

## Git Tags

This project uses git tags to allow you to jump to different instances of the application. After each
live stream, we will create a tag so you can see what the code looks like before and after.

- [starter](https://github.com/trycourier/pigeon-weather/tree/starter): The initial state of the app
- [20200311](https://github.com/trycourier/pigeon-weather/tree/20200311) ([video](https://youtu.be/0PakKiz6_hQ)): The result of the 3/11/2020 live stream that set up email and SMS notifications using Courier
- [20200415](https://github.com/trycourier/pigeon-weather/tree/20200415) ([video](https://youtu.be/XDVtApAa8nw)): The result of the 4/15/2020 live stream that added Slack notifications using Courier
