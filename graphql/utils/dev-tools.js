
const logger = {};

logger.log = function(msg) {
  console.log(msg);
}

logger.error = function(msg, error) {
	console.error(msg, error);
	console.error(error.stack);
}

const DBLogger = {
  action: (action, params) => {
    // TODO: use config
  	if(process.env.NODE_ENV === 'production')
  		return;
    console.log(`Received action: ${action} with params: `, params);
  },
  response: (action, data) => {
  	if(process.env.NODE_ENV === 'production')
  		return;
    console.log(`Response from action: ${action}: `, data);
  }
}

export {
	logger,
	DBLogger
}