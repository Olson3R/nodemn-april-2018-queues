This is a simple CLI example that shows how to produce messages and then consume the messages:
- Directly sending messages to an SQS queue and then consuming them.
- Publishing the messages to an SNS topic and then consuming them from a subscribed SQS queue.

# Tech
- [AWS SDK](https://aws.amazon.com/sdk-for-node-js/) - AWS sdk for NodeJS
  - [AWS SQS](https://aws.amazon.com/sqs/) - AWS Simple Queue Service
  - [AWS SNS](https://aws.amazon.com/sns/) - AWS Simple Notification Service

# Installation & Configuration
1. `./scripts/yarn-1.5.1.js` to install the node dependencies.
2. Setup an SQS queue.
3. Setup an SNS topic.
4. Subscribe the SQS queue to the SNS topic.
5. Add the url for the SQS queue to the config.
6. Add the ARN for the SNS topic to the config.

# Usage
- `./sns_cli.js produce-sqs <type> [-n <number>]` - Produce messages for SQS of _type_. Send more than one with the `-n <number>` arg.
- `./sns_cli.js produce-sns <type> [-n <number>]` - Produce messages for SNS of _type_. Send more than one with the `-n <number>` arg.
- `./sns_cli.js consume-sqs <type>` - Consume messages from the _type_ SQS queue.
