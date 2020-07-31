import pino from "pino";

var PINO_LOGGER: pino.Logger;

export function getPinoLogger() {
	// if(!!PINO_LOGGER) return PINO_LOGGER;
	const flagValue = inputParser('log-level=');
	const logLevel = !!flagValue ? flagValue : 'info';

	PINO_LOGGER = pino({ level: logLevel, prettyPrint: true }, pino.destination({
		dest: './logs/',
		minLength: 1024,
		sync: false
	}));

	return PINO_LOGGER;
}

function inputParser(flag: string) {
	for (const item of process.argv) {
		let idx = item.indexOf(flag);
		if(idx != -1) {
			console.log(item.substring(idx+flag.length))
			return item.substring(idx+flag.length).trim();
		}
	}
}