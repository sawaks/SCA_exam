const { LOGGING_LEVEL } = process.env;

/**
* @description - Logger class has five methods error(), warn(), info(), debug() and log() which prints the message that's received as
* an argument in the console
* @export
* @class Logger
*/
export class Logger {
  constructor(defaultLevel) {
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      log: 3,
      debug: 4,
    };
    this.defaultLevel = defaultLevel;
  }

  /**
  * @description levelChecker() function takes an argument 'checkingLevel' to check if it is less than or equal to the
  * default level value (LOGGING_LEVEL) and returns true or false.
  * @param {Number} checkingLevel - Numeric value of a particular object member (i.e. levels.info = 2)
  * @returns {Boolean}
  * @memberof Logger
  */
  levelChecker(checkingLevel) {
    return (checkingLevel <= this.levels[this.defaultLevel]);
  }

  /**
  * @description - When this function is called, it checks the condition by calling levelChecker() function and prints values in the console.
  * @param {*} args - can be number, string, array or object and can any number of arguments
  * @memberof Logger
  */
  error(...args) {
    if (this.levelChecker(this.levels.error)) {
      console.error(args.forEach(arg => JSON.stringify(arg))); // eslint-disable-line
    }
  }

  warn(...args) {
    if (this.levelChecker(this.levels.warn)) {
      console.warn(args.forEach(arg => JSON.stringify(arg))); // eslint-disable-line
    }
  }

  info(...args) {
    if (this.levelChecker(this.levels.info)) {
      console.info(args.forEach(arg => JSON.stringify(arg))); // eslint-disable-line
    }
  }

  log(...args) {
    if (this.levelChecker(this.levels.log)) {
      console.log(args.forEach(arg => JSON.stringify(arg))); // eslint-disable-line
    }
  }

  debug(...args) {
    if (this.levelChecker(this.levels.debug)) {
      console.debug(args.forEach(arg => JSON.stringify(arg))); // eslint-disable-line
    }
  }

  group = () => {
    console.group(); // eslint-disable-line
  }

  groupEnd = () => {
    console.groupEnd(); // eslint-disable-line
  }
}

export default new Logger(LOGGING_LEVEL);
