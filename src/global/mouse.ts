
class Mouse {
	x: number;
	y: number;
	pointCount = 0;
	stopCount = 0;
	private leftPress: boolean;
	private tempX: number;
	private tempY: number;

	constructor() {
		global.domController.controlCanvas.addEventListener('mousemove', this.mouseMove.bind(this), true);
		global.domController.controlCanvas.addEventListener('mousedown', this.mouseDown.bind(this), true);
		global.domController.controlCanvas.addEventListener('mouseup', this.mouseUp.bind(this), true);
		global.domController.controlCanvas.addEventListener('mouseout', this.mouseOut.bind(this), true);
	}

	update() {
		if (this.leftPress) ++this.pointCount;
		else this.pointCount = 0;

		// このフレーム中には動かなかった
		if (this.x == this.tempX && this.y == this.tempY) {
			this.stopCount++;
		} else {
			this.stopCount = 0;
		}
		this.x = this.tempX;
		this.y = this.tempY;
	}

	judgeEntered(rect: Rect): boolean {
		if (this.x >= rect.x && this.x < rect.x + rect.width && this.y >= rect.y && this.y < rect.y + rect.height) {
			return true;
		}
		return false;
	}

	private mouseMove(event: MouseEvent): void {
		var rect = (<Element>event.target).getBoundingClientRect();
		this.tempX = event.clientX - rect.left;
		this.tempY = event.clientY - rect.top;
	}

	private mouseDown(event: MouseEvent): void {
		this.leftPress = true;
	}

	private mouseUp(event: MouseEvent): void {
		this.leftPress = false;
	}

	private mouseOut(event: MouseEvent): void {
		this.leftPress = false;
	}
}
