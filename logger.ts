import {createLogger, format, transports} from "winston";

const {combine, timestamp, colorize, printf} = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  level: "debug",
  format: combine(
    colorize(),
    //label({ label: 'right meow!' }),
    timestamp({format: 'HH:mm:ss'}),
    myFormat
  ),
  //defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new transports.File({ filename: "combined.log" }),
    new transports.Console(),
    new transports.File({ filename: "server.log"}),
  ],
});