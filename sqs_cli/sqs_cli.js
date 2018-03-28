#!/usr/bin/env node

const program = require('commander');
const aws = require('aws-sdk');
const Config = require('getconfig');
const _ = require('lodash');

const pkg = require('./package');

function parseIntDefault(value, defaultValue) {
  return parseInt(value) || defaultValue;
}

program
  .version(pkg.version)
  .description('CLI examples for Kue.');

program
  .command('produce <type>')
  .description('Enqueue messages to Kue.')
  .option('-n, --number <number>', 'The number of messages to enqueue.', parseIntDefault, 1)
  // .option('-p, --priority <priority>', 'Priority for the job.', 'normal')
  .action((type, options) => {
    console.log(`Sending ${options.number} ${type} message(s) to SNS`);
    var credentials = new aws.SharedIniFileCredentials({ profile: Config.AWS_PROFILE });
    aws.config.update({ credentials: credentials, region: 'us-east-1' });
    let sqs = new aws.SQS({ apiVersion: '2012-11-05' });

    _(_.times(options.number))
      .each((i) => {
        let params = {
          DelaySeconds: 10,
          MessageAttributes: {
           'I': {
             DataType: 'Number',
             StringValue: `${i}`
            }
          },
          MessageBody: `This is a ${type} message!`,
          QueueUrl: 'https://sqs.us-east-1.amazonaws.com/296429066411/dev-taco'
         };

         sqs.sendMessage(params, (err, data) => {
          if (err) {
            console.error(`Error: ${err}`);
          } else {
            console.log(`Success: ${JSON.stringify(data)}`);
          }
         });
      });
  });

program
  .command('consume <name> <queues>')
  .description('Start a queue worker.')
  .action((name, types) => {
    let workerName = `Worker ${name}`;
    console.log(workerName);

    _(types)
      .split(',')
      .each((type) => {
        type = _.trim(type);
        console.log(`Processing ${type}`);
        queue.process(type, function(job, done){
          console.log(`${workerName}: Processing ${JSON.stringify(job)}`);
          // setTimeout(done, 1000);
          done('I went KABOOOM');
          // done();
        });
      });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
