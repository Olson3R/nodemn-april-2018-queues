/**
 * Example lambda SNS Topic subscriber.
 * Sends the message to a slack channel.
 */

const Config = require('config');
const { IncomingWebhook } = require('@slack/client');

function field(title, value) {
  return {
    title: title,
    value: value
  }
}

exports.handler = function (event, context, callback) {
  const slack = Config.get('slack');
  const webhook = new IncomingWebhook(slack.WEBHOOK_URL);
  webhook.send({
    text: 'Lambda processed a message!',
    channel: slack.CHANNEL,
    username: slack.USERNAME,
    fields: [
      field('Event', event),
      field('Context', context)
    ]
  }, (err, response) => {
    if (err) return console.error(err);
    console.log(response);
  });
  callback();
}
