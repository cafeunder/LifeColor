
/**
 * メインメニューに配置されるパネルを表すクラスの抽象クラス。
 */
abstract class MainMenuPanel {
	abstract update(canvasDrawer: CanvasImageDrawer): PanelChangeStatus;
	abstract draw(canvasDrawer: CanvasImageDrawer);
}
