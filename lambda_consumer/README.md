This is a simple lambda example that consumes messages from any SNS topic it is subscribed to and posts the message to a Slack channel.

# Tech
- Lambda
- Slack

# Installation
1. Create an [Incoming Webhook](https://api.slack.com/incoming-webhooks)
2. Add the slack webhook url to the configuration.
1. `npm run setup` to install the node dependencies using yarn from the scripts directory.
4. Add the files to a zip archive.
5. Create you [AWS SNS topic](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html)
6. Create your lambda.
7. Add the SNS topic as a trigger.
8. Upload your code archive to the lambda.

# Usage
- Publish messages to the SNS topic that the Lambda is subscribed to.
