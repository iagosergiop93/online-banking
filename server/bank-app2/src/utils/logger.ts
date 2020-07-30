import pino from "pino";

export var PINO_LOGGER: pino.Logger;

export function getPinoLogger() {
	if(!!PINO_LOGGER) return PINO_LOGGER;
	for(const item of process.argv) {
		const idx = item.indexOf('log-level=');
		if(idx != -1) {
			console.log(item.substring(idx+10));
			PINO_LOGGER = pino({ level: item.substring(idx+10), prettyPrint: true });
			return PINO_LOGGER;
		}
	}
	PINO_LOGGER = pino({ level: "info", prettyPrint: true });
	return PINO_LOGGER;
}
