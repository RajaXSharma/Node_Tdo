const winston = require('winston');
const path = require('path');

// Custom format to include filename and line number
const fileAndLineFormat = winston.format((info, opts) => {
  if (info.meta && info.meta.stack) {
    const stackInfo = info.meta.stack[0];
    info.filename = path.basename(stackInfo.fileName);
    info.lineNumber = stackInfo.lineNumber;
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    fileAndLineFormat(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message, filename, lineNumber }) => {
      return `[${filename}:${lineNumber}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

// Overwrite the logger's log methods to capture stack trace
['error', 'warn', 'info', 'verbose', 'debug', 'silly'].forEach((level) => {
  const originalMethod = logger[level];
  logger[level] = function (message, ...args) {
    const stackTrace = {};
    Error.captureStackTrace(stackTrace, logger[level]);
    const callSite = stackTrace.stack.split('\n')[1];
    const match = callSite.match(/\((.+):(\d+):\d+\)$/);
    if (match) {
      const [, fileName, lineNumber] = match;
      return originalMethod.call(this, message, { 
        meta: { 
          stack: [{ fileName, lineNumber: parseInt(lineNumber, 10) }] 
        }, 
        ...args 
      });
    }
    return originalMethod.call(this, message, ...args);
  };
});

module.exports = logger;


