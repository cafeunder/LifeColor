
class MenuElement {
	/**
	 * 画像オブジェクト
	 */
	img: HTMLImageElement | HTMLImageElement[];

	/**
	 * メニューキャンバス左上座標からの相対位置x
	 */
	x: number;
	/**
	 * メニューキャンバス左上座標からの相対位置y
	 */
	y: number;
	/**
	 * xからの横幅
	 */
	width: number;
	/**
	 * yからの縦幅
	 */
	height: number;

	/**
	 * 状態を複数持つ場合の状態番号（状態が1つなら不要）
	 */
	status?: number;

	constructor(
		img: HTMLImageElement | HTMLImageElement[],
		x: number,
		y: number,
		width: number,
		height: number,
		status?: number
	) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.status = status;
	}
}

class CellSizeConfigMenu {
	private static element_size = 28;
	private static element_between_space = 8;
	private static inner_margin = 8;
	private static outer_margin = 10;
	private static element_imagename_list = [
		"cellSize_big",
		"cellSize_mid",
		"cellSize_small",
		["window_full", "window_normal"]
	];

	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasDrawer;
	private elementList: MenuElement[];
	private width: number;
	private height: number;

	constructor(domController: DOMController) {
		this.canvas = domController.createCanvas(
			"cellSizeConfigMenuCanvas",
			4
		);
		this.canvasDrawer = new CanvasDrawer(this.canvas);
		this.createMenuElement();
		this.canvasDrawer.changeCanvas(
			domController.getWidth() - (this.width + CellSizeConfigMenu.outer_margin),
			CellSizeConfigMenu.outer_margin,
			this.width,
			this.height
		);
	}

	draw(): void {
		this.canvasDrawer.drawRect(
			{
				x: 0,
				y: 0,
				width: this.width,
				height: this.height
			},
			{
				r: 10,
				g: 10,
				b: 10,
				a: 230
			}
		);
		this.canvasDrawer.reflesh();
		this.elementList.forEach((elm: MenuElement) => {
			this.canvasDrawer.drawImage(
				(Array.isArray(elm.img)) ? elm.img[elm.status] : elm.img,
				elm.x,
				elm.y
			);
			console.log(elm);
		});
	}

	private createMenuElement(): void {
		this.elementList = [];
		var count: number = 0;
		CellSizeConfigMenu.element_imagename_list.forEach((imgname: string | string[]) => {
			this.elementList.push(
				new MenuElement(
					Array.isArray(imgname) ? ImageManager.getImageList(imgname) : ImageManager.imageMap[imgname],
					CellSizeConfigMenu.inner_margin + (CellSizeConfigMenu.element_size + CellSizeConfigMenu.element_between_space) * count,
					CellSizeConfigMenu.inner_margin,
					CellSizeConfigMenu.element_size,
					CellSizeConfigMenu.element_size,
					0
				)
			);
			++count;
		})

		this.width =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size * count
			+ CellSizeConfigMenu.element_between_space * (count - 1);
		this.height =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size;
	}
}