
const register = (options) => {
  const logentries = require('node-logentries');
  const os = require('os');
  const util = require('util');

  log = logentries.logger(options);
  
  [['log', 'debug'], 'info', ['warn', 'warning'], ['error', 'err']].forEach((level) => {
    let loggerFunction = log[level];
    let consoleLevel = level;
  
    if (Array.isArray(level)) {
      loggerFunction = logentries ? log[level[1]].bind(log) : log[level[0]].bind(log);
      consoleLevel = level[0];
    }

    const originalLog = console[consoleLevel];
  
    const hostname = os.hostname();
  
    const logWithFormat = (...params) => {
      let str = util.format(...params);
      const domain = process.domain;
      const correlationIds = domain && domain.correlationIds;
      const user = domain && domain.req && domain.req.user;
  
      if (hostname) {
        str = `[${hostname}] ${str}`;
      }
      if (user) {
        str = `[${user.id}] ${str}`;
      }
      if (correlationIds && correlationIds.length) {
        str = `[${correlationIds.join('|')}] ${str}`;
      }
  
      loggerFunction(str);
      if (options.print) {
        originalLog(str);
      }
    };
  
    console[consoleLevel] = logWithFormat;
  });
};

exports.register = register;
