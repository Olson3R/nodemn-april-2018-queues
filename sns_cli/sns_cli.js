#!/usr/bin/env node

const program = require('commander');
const aws = require('aws-sdk');
const Config = require('config');
const _ = require('lodash');

const pkg = require('./package');

function parseIntDefault(value, defaultValue) {
  return parseInt(value) || defaultValue;
}

program
  .version(pkg.version)
  .description('CLI examples for SNS.');

program
  .command('produce-sqs <type>')
  .description('Enqueue messages to SQS.')
  .option('-n, --number <number>', 'The number of messages to enqueue.', parseIntDefault, 1)
  .action((type, options) => {
    console.log(`Sending ${options.number} ${type} message(s) to SQS Queue`);
    var credentials = new aws.SharedIniFileCredentials({ profile: Config.get('AWS_PROFILE') });
    aws.config.update({ credentials: credentials, region: 'us-east-1' });
    let sqs = new aws.SQS({ apiVersion: '2012-11-05' });
    let queueUrl = Config.get('QUEUE_URLS')[type];
    console.log(`SQS url ${queueUrl}`);

    _(_.times(options.number))
      .each((num) => {
        let payload = {
          DelaySeconds: 10,
          MessageAttributes: {
            'Type': {
              DataType: 'String',
              StringValue: type
            },
           'Num': {
             DataType: 'Number',
             StringValue: `${num}`
            }
          },
          MessageBody: `This is a ${type} message!`,
          QueueUrl: queueUrl
         };

         sqs.sendMessage(payload, (err, data) => {
          if (err) {
            console.error(`Error: ${err}`);
          } else {
            console.log(`Success: ${JSON.stringify(data)}`);
          }
         });
      });
  });

program
  .command('produce-sns <type>')
  .description('Publish messages to an SNS Topic.')
  .option('-n, --number <number>', 'The number of messages to publish.', parseIntDefault, 1)
  .action((type, options) => {
    console.log(`Publishing ${options.number} ${type} message(s) to SNS Topic`);
    var credentials = new aws.SharedIniFileCredentials({ profile: Config.get('AWS_PROFILE') });
    aws.config.update({ credentials: credentials, region: 'us-east-1' });
    let sns = new aws.SNS({ apiVersion: '2012-11-05' });
    let topicArn = Config.get('TOPIC_ARNS')[type];
    console.log(`SNS Topic ARN ${topicArn}`);

    _(_.times(options.number))
      .each((num) => {
        let params = {
          'Num': {
            DataType: 'Number',
            StringValue: `${num}`
          }
        }

        let payload = {
          Subject: type,
          Message: JSON.stringify({ default: JSON.stringify(params) }),
          MessageStructure: 'json',
          TopicArn: topicArn
        };

        sns.publish(payload, (err, data) => {
          if (err) {
            console.error(`Error: ${err}`);
          } else {
            console.log(`Success: ${JSON.stringify(data)}`);
          }
        });
      });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
