const sleep = 550;

export function wait() {
	return new Promise((resolve) => setTimeout(resolve, sleep));
}

export function waitValue<T>(value: T): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(value), sleep));
}

export function waitHnd<T>(hnd: () => T): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(hnd()), sleep));
}

export function waitCall<T>(handler: () => T, signal: AbortSignal) {
	return new Promise<T>((resolve) =>
		setTimeoutEx(handler, resolve, sleep, signal)
	);
}

export function setTimeoutEx<T>(
	handler: () => T,
	resolve: (value: T) => void,
	delay: number,
	signal: AbortSignal
) {
	signal.addEventListener('abort', handleAbort);

	const internalTimer = setTimeout(internalCallback, delay);

	function handleAbort() {
		console.warn('Canceling timer (%s) via signal abort.', internalTimer);
		clearTimeout(internalTimer);
	}

	function internalCallback() {
		signal.removeEventListener('abort', handleAbort);

		resolve(handler());
	}

	return internalTimer;
}
