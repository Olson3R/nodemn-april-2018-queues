This is a simple lambda example that consumes messages from any SNS topic it is subscribed to and posts the message to a Slack channel.

# Tech
- Lambda
- Slack

# Installation
1. Create an [Incoming Webhook](https://api.slack.com/incoming-webhooks)
2. Add the slack webhook url to the configuration.
3. `./scripts/yarn-1.5.1.js` to install node dependencies.
4. Add the files to a zip archive.
5. Create you [AWS SNS topic](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html)
6. Create your lambda.
7. Add the SNS topic as a trigger.
8. Upload your code archive to the lambda.

# Usage
- Publish messages to the SNS topic that the Lambda is subscribed to.
