
/**
 * トップメニューを表示するパネルを表すクラス。
 */
class TopPagePanel extends MainMenuPanel {
	private static element_size = 60;
	private static element_line_width = 2;
	private static inner_margin = 8;
	private static vertical_line_between_space = 6;
	private static vertical_line_width = 2;
	private static vertical_line_height = 48;
	private static vertical_line_y = 14;

	private messageBox: MessageBox;
	private elementList: MenuElementWithExplain[];
	private verticalLineXList: number[];
	private changeStatus: PanelChangeStatus;

	constructor(cellMapController: CellMapController, cellPlanter: CellPlanter, messageBox: MessageBox) {
		super();
		var x = 0;

		this.messageBox = messageBox;
		this.elementList = [];
		this.verticalLineXList = [];
		// スピードダウン
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_slow"],
				(x += TopPagePanel.inner_margin),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.enable = cellMapController.getAlternationSetter().canUp();
				},
				(self: MenuElement) => {
					var setter = cellMapController.getAlternationSetter();
					if (setter.canUp()) {
						setter.setIndex(setter.getIndex() + 1);
					}
				},
				"世代交代のスピードを遅くします。"
			)
		);
		// ストップ・スタート切り替え
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.getImageList(["menu_stop", "menu_play"]),
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.status = (cellMapController.getPause()) ? 1 : 0;
				},
				(self: MenuElement) => {
					if (self.status == 0) {
						cellMapController.setPause(true);
						self.status = 1;
					} else {
						cellMapController.setPause(false);
						self.status = 0;
					}
				}, 
				["世代交代を停止します。", "世代交代を再開します。"], 0,
			)
		);
		// スピードアップ
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_fast"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.enable = cellMapController.getAlternationSetter().canDown();
				},
				(self: MenuElement) => {
					var setter = cellMapController.getAlternationSetter();
					if (setter.canDown()) {
						setter.setIndex(setter.getIndex() - 1);
					}
				}, "世代交代のスピードを早くします。"
			)
		);
		// 盤面のセーブ
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_save"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => {},
				() => {
					cellMapController.saveMap();
				}, "現在のマップを保存します。"
			)
		);
		// 盤面のロード
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_load"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.enable = cellMapController.canLoadMap();
				},
				() => {
					cellMapController.loadMap();
				}, "保存したマップを復元します。"
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// ペンモード
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_pencil"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.selected = cellPlanter.getDrawingTool() == DrawingTool.PEN;
				},
				() => {
					cellPlanter.setDrawingTool(DrawingTool.PEN);
				},
				"#cペン#w：クリックした位置にセルを追加します。"
			)
		);
		// 消しゴムモード
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_eraser"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.selected = cellPlanter.getDrawingTool() == DrawingTool.ERASER;
				},
				() => {
					cellPlanter.setDrawingTool(DrawingTool.ERASER);
				},
				"#c消しゴム#w：クリックした位置のセルを削除します。"
			)
		);
		// スタンプモード
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_stamp"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.selected = cellPlanter.getDrawingTool() == DrawingTool.STAMP;
				},
				() => {
					this.changeStatus = PanelChangeStatus.GO_STAMP_PANEL;
				},
				"#cスタンプ#w：一覧からパターンを選択し、クリックで配置します。"
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// 盤面のクリア
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_clear"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => {},
				() => {
					cellMapController.clear();
				}, "すべてのセルを削除します。"
			)
		);
		// 盤面のランダマイズ
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_random"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => {},
				() => {
					cellMapController.randomize();
				}, "すべてのセルを削除し、セルをランダムに配置します。"
			)
		);
		// テンプレート一覧へ
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_template"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				() => {},
				() => {
					this.changeStatus = PanelChangeStatus.GO_TEMPLATE_PANEL;
				}, "一覧から選んだパターンを配置します。"
			)
		);

		// グループを区切る棒
		this.verticalLineXList.push(x += TopPagePanel.element_size + TopPagePanel.vertical_line_between_space);

		// グリッド表示・非表示切り替え
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_grid"],
				(x += TopPagePanel.vertical_line_width + TopPagePanel.vertical_line_between_space),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.status = (cellMapController.getVisibleGrid()) ? 0 : 1;
					self.selected = self.status == 0;
				},
				(self: MenuElement) => {
					cellMapController.setVisibleGrid(self.status != 0);
				},
				["グリッドを非表示にします。", "グリッドを表示します。"], 0
			)
		);
		// グラデーションのオン・オフ
		this.elementList.push(
			new MenuElementWithExplain(
				global.imageManager.imageMap["menu_color"],
				(x += TopPagePanel.element_size),
				TopPagePanel.inner_margin, TopPagePanel.element_size, TopPagePanel.element_size,
				(self: MenuElement) => {
					self.status = (cellMapController.getVisibleGradation()) ? 0 : 1;
					self.selected = self.status == 0;
				},
				(self: MenuElement) => {
					cellMapController.setVisibleGradation(self.status != 0);
				},
				["マップのグラーデーションをオフにします。", "マップのグラデーションをオンにします。"], 0
			)
		);
	}

	update(canvasDrawer: CanvasImageDrawer): number {
		this.changeStatus = PanelChangeStatus.HOLD_PANEL;
		this.elementList.forEach((elm: MenuElementWithExplain) => {
			elm.update(elm);
			if (global.mouse.judgeEntered({
				x: canvasDrawer.x + elm.x,
				y: canvasDrawer.y + elm.y,
				width: elm.width,
				height: elm.height
			})) {
				elm.mouseover = true;
				this.messageBox.setMessage(elm.getExplain());
				if (global.mouse.pointCount == 1) {
					elm.action(elm);
				}
			} else {
				elm.mouseover = false;
			}
		});

		return this.changeStatus;
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
		if (elm.enable && elm.mouseover) {
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
		// 選択状態の描画処理
		if (elm.enable && !elm.mouseover && elm.selected) {
			canvasDrawer.drawRect({
				x: elm.x + 1,
				y: elm.y + 1,
				width: elm.width - 2,
				height: elm.height - 2
			}, {r: 0, g: 100, b: 255, a: 255}, false, 2);
			canvasDrawer.drawRect({
				x: elm.x + 5,
				y: elm.y + 5,
				width: elm.width - 10,
				height: elm.height - 10
			}, {r: 0, g: 60, b: 153, a: 255}, false, 2);
		}

		// アイコンの描画処理
		var image = elm.getImage();
		canvasDrawer.drawImage(
			image,
			elm.x + Math.floor(elm.width / 2 - image.width / 2),
			elm.y + Math.floor(elm.height / 2 - image.height / 2),
			(elm.enable) ? null : 0.5
		);
	}
}
