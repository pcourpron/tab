const GitHubApi = require('github')
const github = new GitHubApi({
  version: '3.0.0'
})

function sayHi (payload, context) {
  const username = payload.comment.user.login

  github.issues.createComment({
    user: 'shortybot',
    repo: payload.repository.name,
    number: payload.issue.number,
    body: `Hi @${username}!`
  }, context.done)
}

/**
 * Return true if the payload was processed successfully
 */
function handleIssueComment (payload, context) {
  if (payload.action === 'created' && payload.comment.body.indexOf('@shortybot') !== -1) {
    return sayHi(payload, context)
  }
  return false
}

module.exports.githubWebhookListener = (event, context) => {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  })
  event['Records'].map(record => {
    const payload = JSON.parse(record.Sns.Message)
    const messageType = record.Sns.MessageAttributes['X-Github-Event'].Value
    let success = false

    if (messageType === 'issue_comment') {
      success = handleIssueComment(payload, context)
    }

    if (!success) {
      console.log('Error processing:', payload)
      context.done()
    }
  })
}
