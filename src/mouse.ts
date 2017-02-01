
class Mouse {
	static x: number;
	static y: number;
	static pointCount = 0;
	static stopCount = 0;
	private static leftPress: boolean;
	private static tempX: number;
	private static tempY: number;

	static setEventListener(domController: DOMController) {
		domController.controlCanvas.addEventListener('mousemove', Mouse.mouseMove, true);
		domController.controlCanvas.addEventListener('mousedown', Mouse.mouseDown, true);
		domController.controlCanvas.addEventListener('mouseup', Mouse.mouseUp, true);
		domController.controlCanvas.addEventListener('mouseout', Mouse.mouseOut, true);
	}

	static update() {
		if (Mouse.leftPress) ++Mouse.pointCount;
		else Mouse.pointCount = 0;

		Mouse.x = Mouse.tempX;
		Mouse.y = Mouse.tempY;
		Mouse.stopCount++;
	}

	private static mouseMove(event){
		var rect = event.target.getBoundingClientRect();
		Mouse.tempX = event.clientX - rect.left;
		Mouse.tempY = event.clientY - rect.top;
		Mouse.stopCount = 0;
	}

	private static mouseDown(event){
		Mouse.leftPress = true;
	}

	private static mouseUp(event){
		Mouse.leftPress = false;
	}

	private static mouseOut(event){
		Mouse.leftPress = false;
	}
}
