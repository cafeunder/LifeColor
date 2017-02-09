
class MainTopMenu {
	private static element_size = 58;
	private static element_line_width = 2;
	private static inner_margin = 9;
	private static element_between_space = 2;
	private static vertical_line_between_space = 7;
	private static vertical_line_width = 2;
	private static vertical_line_height = 48;
	private static vertical_line_y = 14;

	private elementList: MenuElement[];
	private verticalLineXList: number[];

	constructor() {
		var x: number = 0;

		this.elementList = [];
		this.verticalLineXList = [];
		// スピードダウン
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_slow"],
				(x += MainTopMenu.inner_margin),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("slow"); }
			)
		);
		// ストップ・スタート切り替え
		this.elementList.push(
			new MenuElement(
				global.imageManager.getImageList(["menu_stop", "menu_play"]),
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				(self: MenuElement) => {
					if (self.status == 0) {
						console.log("stop");
						self.status = 1;
					} else {
						console.log("play");
						self.status = 0;
					}
				}, 0
			)
		);
		// スピードアップ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_fast"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("fast"); }
			)
		);
		// 盤面のセーブ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_save"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("save"); }
			)
		);
		// 盤面のロード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_load"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("load"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += MainTopMenu.element_size + MainTopMenu.vertical_line_between_space);

		// ペンモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_pencil"],
				(x += MainTopMenu.vertical_line_width + MainTopMenu.vertical_line_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("pencil"); }
			)
		);
		// 消しゴムモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_eraser"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("eraser"); }
			)
		);
		// スタンプモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_stamp"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("stamp"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += MainTopMenu.element_size + MainTopMenu.vertical_line_between_space);

		// 盤面のクリア
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_clear"],
				(x += MainTopMenu.vertical_line_width + MainTopMenu.vertical_line_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("clear"); }
			)
		);
		// 盤面のランダマイズ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_random"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("random"); }
			)
		);
		// テンプレート一覧へ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_template"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("template"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += MainTopMenu.element_size + MainTopMenu.vertical_line_between_space);

		// グリッド表示・非表示切り替え
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_grid"],
				(x += MainTopMenu.vertical_line_width + MainTopMenu.vertical_line_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("grid"); }
			)
		);
		// ダミー
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_grid"],
				(x += MainTopMenu.element_size + MainTopMenu.element_between_space),
				MainTopMenu.inner_margin, MainTopMenu.element_size, MainTopMenu.element_size,
				() => { console.log("grid"); }
			)
		);
	}

	update(canvasDrawer: CanvasImageDrawer): void {
		this.elementList.forEach((elm: MenuElement) => {
			if (global.mouse.judgeEntered({
				x: canvasDrawer.x + elm.x,
				y: canvasDrawer.y + elm.y,
				width: elm.width,
				height: elm.height
			})) {
				elm.mouseover = true;

				if (global.mouse.pointCount == 1) {
					elm.action(elm);
				}
			} else {
				elm.mouseover = false;
			}
		});
	}

	draw(canvasDrawer: CanvasImageDrawer): void {
		this.elementList.forEach((elm: MenuElement) => {
			// マウスオーバー時の描画処理
			if (elm.mouseover) {
				// 背景の四角形
				canvasDrawer.drawRect({
					x: elm.x + 1,
					y: elm.y + 1,
					width: elm.width - 2,
					height: elm.height - 2
				}, {r: 0, g: 63, b: 63, a: 204});
				// 枠の四角形
				canvasDrawer.drawRect({
					x: elm.x,
					y: elm.y,
					width: elm.width,
					height: elm.height
				}, {r: 0, g: 255, b: 160, a: 255}, false, 2);
			}

			// アイコンの描画処理
			var image = (Array.isArray(elm.img)) ? elm.img[elm.status] : elm.img;
			canvasDrawer.drawImage(
				image,
				elm.x + (MainTopMenu.element_size / 2 - image.width / 2),
				elm.y + (MainTopMenu.element_size / 2 - image.height / 2),
			);
		})

		// グループを区切る棒の描画
		this.verticalLineXList.forEach((x: number) => {
			canvasDrawer.drawRect({
				x: x,
				y: MainTopMenu.vertical_line_y,
				width: MainTopMenu.vertical_line_width,
				height: MainTopMenu.vertical_line_height
			}, {r: 60, g: 60, b: 60, a: 180});
		});
	}
}