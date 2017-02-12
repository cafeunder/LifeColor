
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

	/**
	 * 選択されたか？
	 */
	selected: boolean;

	/**
	 * 有効か？
	 */
	enable: boolean;

	/**
	 * ポインタが上に乗っているか？
	 */
	mouseover: boolean;

	/**
	 * 毎フレーム呼び出されるべき状態更新メソッド
	 */
	update: (self: MenuElement) => void;

	/**
	 * 押されたときの動作
	 */
	action: (self: MenuElement) => void;

	constructor(
		img: HTMLImageElement | HTMLImageElement[],
		x: number,
		y: number,
		width: number,
		height: number,
		update: (self: MenuElement) => void,
		action: (self: MenuElement) => void,
		status?: number
	) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.status = status;
		this.enable = true;
		this.selected = false;
		this.mouseover = false;
		this.update = update;
		this.action = action;
	}

	getImage(): HTMLImageElement {
		return (Array.isArray(this.img)) ? this.img[this.status] : this.img;
	}
}
