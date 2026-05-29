/**
 * Standardized logger for the mobile app.
 * Non-error logs are disabled in production.
 */

const IS_DEV = __DEV__;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function shouldLog(level: LogLevel): boolean {
  return IS_DEV || level === 'error';
}

function write(level: LogLevel, tag: string, message: string, ...args: unknown[]) {
  if (!shouldLog(level)) return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}][${level.toUpperCase()}][${tag}]`;

  switch (level) {
    case 'debug':
      console.debug(prefix, message, ...args);
      break;
    case 'info':
      console.info(prefix, message, ...args);
      break;
    case 'warn':
      console.warn(prefix, message, ...args);
      break;
    case 'error':
      console.error(prefix, message, ...args);
      break;
  }
}

export const logger = {
  debug: (tag: string, message: string, ...args: unknown[]) =>
    write('debug', tag, message, ...args),
  info: (tag: string, message: string, ...args: unknown[]) =>
    write('info', tag, message, ...args),
  warn: (tag: string, message: string, ...args: unknown[]) =>
    write('warn', tag, message, ...args),
  error: (tag: string, message: string, ...args: unknown[]) =>
    write('error', tag, message, ...args),
};
