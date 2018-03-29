#!/usr/bin/env node

const program = require('commander');
const kue = require('kue');
const _ = require('lodash');

const pkg = require('./package');

function parseIntDefault(value, defaultValue) {
  return parseInt(value) || defaultValue;
}

function secondsFromNow(sec) {
  let d = new Date();
  d.setSeconds(d.getSeconds() + sec);
  return d;
}

program
  .version(pkg.version)
  .description('CLI examples for Kue.');

program
  .command('produce <type>')
  .description('Enqueue messages to Kue.')
  .option('-n, --number <number>', 'The number of messages to enqueue.', parseIntDefault, 1)
  .option('-p, --priority <priority>', 'Priority for the job.', 'normal')
  .action((type, options) => {
    console.log(`Enqueuing ${options.number} ${type} message(s) to Kue`);

    let queue = kue.createQueue({ jobEvents: false });
    // // let queue = kue.createQueue();

    _(_.times(options.number))
      .each((i) => {
        let job = queue.create(type, { num: i })
          .priority(options.priority)
          // .delay(10000)
          // .delay(secondsFromNow(10))
          .attempts(5)
          // .backoff({ type: 'exponential' })
          .save(function(err) {
            console.log(`Job: ${JSON.stringify(job)}`);
          })
          // .on('failed attempt', (err, doneAttempts) => {
          //   console.error(`Failed attempt: id: ${job.id}, attempt ${doneAttempts}, error: ${err}`);
          // });
      });
  });

program
  .command('consume <name> <queues>')
  .description('Start a queue worker.')
  .action((name, types) => {
    let workerName = `Worker ${name}`;
    console.log(workerName);
    let queue = kue.createQueue();

    _(types)
      .split(',')
      .each((type) => {
        type = _.trim(type);
        console.log(`Processing ${type}`);
        queue.process(type, function(job, done){
          console.log(`${workerName}: Processing ${JSON.stringify(job, null, 2)}`);

          // DO STUFF HERE

          // setTimeout(done, 1000);
          // done('I went KABOOOM');
          done();
        });
      });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
