
class TopPagePanel extends MainMenuPanel {
	private static element_size = 60;
	private static element_line_width = 2;
	private static inner_margin = 8;
	private static vertical_line_between_space = 6;
	private static vertical_line_width = 2;
	private static vertical_line_height = 48;
	private static vertical_line_y = 14;

	private elementList: MenuElement[];
	private verticalLineXList: number[];

	constructor() {
		super();
		var x = 0;

		this.elementList = [];
		this.verticalLineXList = [];
		// スピードダウン
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_slow"],
				(x += TopPagePanel.inner_margin),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("slow"); }
			)
		);
		// ストップ・スタート切り替え
		this.elementList.push(
			new MenuElement(
				global.imageManager.getImageList(["menu_stop", "menu_play"]),
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
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
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("fast"); }
			)
		);
		// 盤面のセーブ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_save"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("save"); }
			)
		);
		// 盤面のロード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_load"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("load"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// ペンモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_pencil"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("pencil"); }
			)
		);
		// 消しゴムモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_eraser"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("eraser"); }
			)
		);
		// スタンプモード
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_stamp"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("stamp"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// 盤面のクリア
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_clear"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("clear"); }
			)
		);
		// 盤面のランダマイズ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_random"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("random"); }
			)
		);
		// テンプレート一覧へ
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_template"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("template"); }
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// グリッド表示・非表示切り替え
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_grid"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("grid"); }
			)
		);
		// ダミー
		this.elementList.push(
			new MenuElement(
				global.imageManager.imageMap["menu_grid"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => { console.log("grid"); }
			)
		);
	}

	update(canvasDrawer: CanvasImageDrawer): number {
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

		return 0;
	}

	draw(canvasDrawer: CanvasImageDrawer): void {
		// アイコンの描画
		this.elementList.forEach((elm: MenuElement) => {
			TopPagePanel.drawElement(elm, canvasDrawer, TopPagePanel.element_line_width);
		});

		// グループを区切る棒の描画
		this.verticalLineXList.forEach((x: number) => {
			canvasDrawer.drawRect({
				x: x,
				y: TopPagePanel.vertical_line_y,
				width: TopPagePanel.vertical_line_width,
				height: TopPagePanel.vertical_line_height
			}, {r: 60, g: 60, b: 60, a: 180});
		});
	}

	// メニューアイコンを枠付きで描画する
	static drawElement(elm: MenuElement, canvasDrawer: CanvasImageDrawer, lineWidth: number): void {
		// マウスオーバー時の描画処理
		if (elm.mouseover) {
			// 背景の四角形
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 0, g: 63, b: 63, a: 204}
			);
			// 枠の四角形
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 0, g: 255, b: 160, a: 255},
				false,
				lineWidth
			);
		}

		// アイコンの描画処理
		var image = elm.getImage();
		canvasDrawer.drawImage(
			image,
			elm.x + Math.floor(elm.width / 2 - image.width / 2),
			elm.y + Math.floor(elm.height / 2 - image.height / 2),
		);
	}
}