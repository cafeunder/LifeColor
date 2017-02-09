
class Keyboard {
	pressedFlagList: {[key: number]: boolean} = {};
	keyCountList: {[key: number]: number} = {};

	constructor() {
		for (var i = 0; i < 256; ++i) {
			this.keyCountList[i] = 0;
			this.pressedFlagList[i] = false;
		}

		document.addEventListener('keyup', this.keyUp.bind(this), true);
		document.addEventListener('keydown', this.keyDown.bind(this), true);
	}

	update(): void {
		for (var code in this.pressedFlagList) {
			if (this.pressedFlagList[code]) {
				++this.keyCountList[code];
			} else {
				this.keyCountList[code] = 0;
			}
		}
	}

	check(code: number): number {
		return this.keyCountList[code];
	}

	private keyUp(event: KeyboardEvent): void {
		if (!event) event = <KeyboardEvent>window.event;
		this.pressedFlagList[event.keyCode] = false;
	}

	private keyDown(event: KeyboardEvent): void {
		if (!event) event = <KeyboardEvent>window.event;
		this.pressedFlagList[event.keyCode] = true;
	}

	static KEY_ARROW_LEFT = 37;
	static KEY_ARROW_RIGHT = 39;
	static KEY_SPACE = 32;
	static KEY_C = 67;
	static KEY_E = 69;
	static KEY_F = 70;
	static KEY_G = 71;
	static KEY_H = 72;
	static KEY_M = 77;
	static KEY_P = 80;
	static KEY_Q = 81;
	static KEY_R = 82;
	static KEY_S = 83;
	static KEY_V = 86;
	static KEY_W = 87;
}