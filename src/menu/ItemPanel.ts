
/**
 * アイテム一覧に表示される要素の名前と説明。
 */
interface ItemPanelElementData {
	name: string;
	explain: string;
}

/**
 * 与えられた要素をアイテマイズして表示するパネル。
 */
class ItemPanel extends MainMenuPanel {
	private static element_size = 60;
	private static element_padding = 3;
	private static page_button_size = 27;
	private static between_element_space = 3;
	private static between_page_button_space = 6;
	private static between_back_button_space = 6;
	private static element_line_width = 2;
	private static inner_margin = 8;
	private static page_element_max = 11;

	private elementList: MenuElementWithExplain[][];
	private page: number;
	private backButton: MenuElementWithExplain;
	private pagePrevButton: MenuElementWithExplain;
	private pageNextButton: MenuElementWithExplain;
	private changeStatus: PanelChangeStatus;
	private messageBox: MessageBox;

	constructor(
		itemList: ItemPanelElementData[],
		itemUpdate: (self: MenuElement, name: string) => void,
		itemAction: (name: string) => void,
		messageBox: MessageBox
	) {
		super();
		this.elementList = [];
		this.changeStatus = 0;
		this.messageBox = messageBox;

		var x = 0;
		// 戻るボタン
		this.backButton = new MenuElementWithExplain(
			global.imageManager.imageMap["menu_back"],
			(x += ItemPanel.inner_margin),
			ItemPanel.inner_margin, ItemPanel.element_size, ItemPanel.element_size,
			() => {},
			() => {
				this.changeStatus = PanelChangeStatus.GO_TOP_PANEL;
			}, "メインメニューに戻ります。"
		);

		// 前のページボタン
		this.pagePrevButton = new MenuElementWithExplain(
			global.imageManager.imageMap["menu_pagePrev"],
			(x += ItemPanel.element_size + ItemPanel.between_back_button_space),
			ItemPanel.inner_margin, ItemPanel.page_button_size, ItemPanel.element_size,
			(elm: MenuElement) => {
				elm.enable = (this.page != 0);
			},
			() => {
				if (this.page > 0) {
					--this.page;
				}
			}, null
		);

		// ページ内要素の先頭のx座標を記憶しておく
		var head_x = x + ItemPanel.page_button_size + ItemPanel.between_page_button_space;
		var page = 0;
		var page_index = 0;

		// 各ページ配列を生成する
		itemList.forEach((item: ItemPanelElementData) => {
			// ページの開始なら新しくページを作る
			if (page_index == 0) {
				this.elementList[page] = [];
				x = head_x;
			}

			// 要素の生成
			var name = item;
			this.elementList[page][page_index] = new MenuElementWithExplain(
				global.imageManager.imageMap[item.name],
				x,
				ItemPanel.inner_margin, ItemPanel.element_size, ItemPanel.element_size,
				(self: MenuElement) => {
					itemUpdate(self, item.name);
				},
				() => {
					itemAction(item.name);
				},
				item.explain
			);
			x += ItemPanel.element_size + ItemPanel.between_element_space;

			++page_index;
			// ページの要素数が上限に達していたら次のページへ
			if (page_index == ItemPanel.page_element_max) {
				++page;
				page_index = 0;
			}
		});

		// 次のページボタン
		this.pageNextButton = new MenuElementWithExplain(
			global.imageManager.imageMap["menu_pageNext"],
			head_x + (ItemPanel.element_size + ItemPanel.between_element_space) * ItemPanel.page_element_max - ItemPanel.between_element_space + ItemPanel.between_page_button_space,
			ItemPanel.inner_margin, ItemPanel.page_button_size, ItemPanel.element_size,
			(elm: MenuElement) => {
				elm.enable = (this.page < (this.elementList.length - 1));
			},
			() => {
				if (this.page < this.elementList.length - 1) {
					++this.page;
				}
			}, null
		);

		this.page = 0;
	}

	update(canvasDrawer: CanvasImageDrawer): PanelChangeStatus {
		this.messageBox.setMessage(" ");
		this.changeStatus = PanelChangeStatus.HOLD_PANEL;

		// ほとんど同じ処理なので同じ配列で処理する
		this.elementList[this.page].concat([
			this.pageNextButton,
			this.pagePrevButton,
			this.backButton
		]).forEach((elm: MenuElementWithExplain) => {
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
		// 戻るボタンはメインメニューの描画スタイルで描画する
		TopPagePanel.drawElement(this.backButton, canvasDrawer, ItemPanel.element_line_width);

		// 前のページ、次のページボタンの描画
		ItemPanel.drawPageButton(this.pagePrevButton, canvasDrawer);
		ItemPanel.drawPageButton(this.pageNextButton, canvasDrawer);

		// ページ内要素の描画
		this.elementList[this.page].forEach((elm: MenuElement) => {
			ItemPanel.drawPageElement(elm, canvasDrawer);
		});
	}

	// ページボタンを枠付きで描画する
	private static drawPageButton(elm: MenuElement, canvasDrawer: CanvasImageDrawer): void {
		// 背景の四角形
		if (elm.mouseover && elm.enable) {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 64, g: 32, b: 0, a: 204}
			);
		} else {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 5, g: 5, b: 5, a: 178}
			);
		}

		// 枠の四角形
		if (elm.mouseover && elm.enable) {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 255, g: 128, b: 0, a: 255},
				false,
				ItemPanel.element_line_width
			);
		} else {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 128, g: 128, b: 128, a: 255},
				false,
				ItemPanel.element_line_width
			);
		}

		// 画像の描画
		var image = elm.getImage();
		canvasDrawer.drawImage(
			elm.getImage(),
			elm.x + Math.floor(elm.width / 2 - image.width / 2),
			elm.y + Math.floor(elm.height / 2 - image.height / 2),
		);

		// ボタンが無効なら暗く表示する
		if (!elm.enable) {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 0, g: 0, b: 0, a: 128}
			);
		}
	}

	// ページ内要素を枠付きで描画する
	private static drawPageElement(elm: MenuElement, canvasDrawer: CanvasImageDrawer): void {
		// 背景の四角形
		if (elm.mouseover) {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 0, g: 16, b: 16, a: 255}
			);
		} else {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 5, g: 5, b: 5, a: 180}
			);
		}
	
		// 枠の四角形
		if (elm.mouseover) {
			canvasDrawer.drawRect(
				{x: elm.x, y: elm.y, width: elm.width, height: elm.height},
				{r: 0, g: 255, b: 160, a: 255},
				false,
				ItemPanel.element_line_width
			);
		} else {
			if (elm.selected) {
				canvasDrawer.drawRect({
					x: elm.x,
					y: elm.y,
					width: elm.width,
					height: elm.height
				}, {r: 0, g: 100, b: 255, a: 255}, false, 2);
				canvasDrawer.drawRect({
					x: elm.x + 4,
					y: elm.y + 4,
					width: elm.width - 8,
					height: elm.height - 8
				}, {r: 0, g: 60, b: 153, a: 255}, false, 2);
			}　else {
				canvasDrawer.drawRect({
					x: elm.x + ItemPanel.element_padding,
					y: elm.y + ItemPanel.element_padding,
					width: elm.width - ItemPanel.element_padding * 2,
					height: elm.height - ItemPanel.element_padding * 2
				}, {r: 64, g: 64, b: 64, a: 255}, false, ItemPanel.element_line_width);
			}
		}

		// 画像の描画
		var image = elm.getImage();
		canvasDrawer.drawImage(
			elm.getImage(),
			elm.x + Math.floor(elm.width / 2 - image.width / 2),
			elm.y + Math.floor(elm.height / 2 - image.height / 2),
		);
	}
}
