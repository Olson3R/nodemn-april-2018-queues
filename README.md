# nodemn-april-2018-queues
Queues, Kues, and more

## [Kue CLI](https://github.com/Olson3R/nodemn-april-2018-queues/tree/master/kue_cli)
- [Kue](https://github.com/Automattic/kue) is a priority job queue backed by redis, built for node.js.
- This is a simple CLI example that shows how to produce jobs and then consume the jobs using Kue](https://github.com/Automattic/kue).

## [SNS CLI](https://github.com/Olson3R/nodemn-april-2018-queues/tree/master/sns_cli)
- This is a simple CLI example that shows how to produce messages and then consume the messages:
  - Directly sending messages to an SQS queue and then consuming them.
  - Publishing the messages to an SNS topic and then consuming them from a subscribed SQS queue.
  
## [Lambda Consumer](https://github.com/Olson3R/nodemn-april-2018-queues/tree/master/lambda_consumer)
- This is a simple lambda example that consumes messages from any SNS topic it is subscribed to.
