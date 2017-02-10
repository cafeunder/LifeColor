
abstract class MainMenuPanel {
	abstract update(canvasDrawer: CanvasImageDrawer): MainMenuChangeStatus;
	abstract draw(canvasDrawer: CanvasImageDrawer);
}
