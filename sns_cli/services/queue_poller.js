const _ = require('lodash');

class QueuePoller {
  constructor(Config, aws, type) {
    this.Config = Config;
    this.aws = aws;
    this.type = type;

    this.sqs = new aws.SQS({ apiVersion: '2012-11-05' });
  }

  get queueUrl() {
    return this.Config.get('QUEUE_URLS')[this.type];
  }

  get receivePayload() {
    return {
      AttributeNames: ['All'],
      MessageAttributeNames: ['All'],
      MaxNumberOfMessages: 1,
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: 10
    };
  }

  poll() {
    console.log(`SQS url ${this.queueUrl}`);
    this.receiveMessage();
  }

  receiveMessage() {
    this.sqs.receiveMessage(this.receivePayload, (err, data) => {
      if (err) {
        console.error(`Receive Error: ${err}`);
      } else {
        console.log(`Receive Success: ${JSON.stringify(data, null, 2)}`);
        let message = _.get(data, 'Messages[0]');
        if (message) {
          this.deleteMessage(message);
        } else {
          this.receiveMessage();
        }
      }
    });
  }

  deletePayload(message) {
    return {
      QueueUrl: this.queueUrl,
      ReceiptHandle: _.get(message, 'ReceiptHandle')
    };
  }

  deleteMessage(message) {
    let payload = this.deletePayload(message);
    this.sqs.deleteMessage(payload, (err, message) => {
      if (err) {
        console.error(`Delete Error: ${err}`);
      } else {
        console.log(`Delete Success: ${JSON.stringify(message, null, 2)}`);
      }
      this.receiveMessage();
    });
  }
}

module.exports = QueuePoller;
