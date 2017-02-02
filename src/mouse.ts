
class Mouse {
	x: number;
	y: number;
	pointCount = 0;
	stopCount = 0;
	private leftPress: boolean;
	private tempX: number;
	private tempY: number;

	constructor() {
		global.domController.controlCanvas.addEventListener('mousemove', this.mouseMove, true);
		global.domController.controlCanvas.addEventListener('mousedown', this.mouseDown, true);
		global.domController.controlCanvas.addEventListener('mouseup', this.mouseUp, true);
		global.domController.controlCanvas.addEventListener('mouseout', this.mouseOut, true);
	}

	update() {
		if (this.leftPress) ++this.pointCount;
		else this.pointCount = 0;

		this.x = this.tempX;
		this.y = this.tempY;
		this.stopCount++;
	}

	private mouseMove(event){
		var rect = event.target.getBoundingClientRect();
		this.tempX = event.clientX - rect.left;
		this.tempY = event.clientY - rect.top;
		this.stopCount = 0;
	}

	private mouseDown(event){
		this.leftPress = true;
	}

	private mouseUp(event){
		this.leftPress = false;
	}

	private mouseOut(event){
		this.leftPress = false;
	}
}
