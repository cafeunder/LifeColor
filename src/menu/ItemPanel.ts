
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

	private itemNameList: string[];
	private elementList: MenuElement[][];
	private page: number;
	private backButton: MenuElement;
	private pagePrevButton: MenuElement;
	private pageNextButton: MenuElement;
	private changeStatus: MainMenuChangeStatus;

	constructor(itemNameList: string[]) {
		super();
		this.elementList = [];
		this.itemNameList = itemNameList;
		this.changeStatus = 0;

		var x = 0;
		// 戻るボタン
		this.backButton = new MenuElement(
			global.imageManager.imageMap["menu_back"],
			(x += ItemPanel.inner_margin),
			ItemPanel.inner_margin, ItemPanel.element_size, ItemPanel.element_size,
			() => {
				this.changeStatus = MainMenuChangeStatus.GO_TOP_PANEL;
			}
		);

		// 前のページボタン
		this.pagePrevButton = new MenuElement(
			global.imageManager.imageMap["menu_pagePrev"],
			(x += ItemPanel.element_size + ItemPanel.between_back_button_space),
			ItemPanel.inner_margin, ItemPanel.page_button_size, ItemPanel.element_size,
			() => {
				if (this.page > 0) {
					this.setPage(this.page - 1);
				}
			}
		);

		// ページ内要素の先頭のx座標を記憶しておく
		var head_x = x + ItemPanel.page_button_size + ItemPanel.between_page_button_space;
		var page = 0;
		var page_index = 0;

		// 各ページ配列を生成する
		this.itemNameList.forEach((itemName: string) => {
			// ページの開始なら新しくページを作る
			if (page_index == 0) {
				this.elementList[page] = [];
				x = head_x;
			}

			// 要素の生成
			var name = itemName;
			this.elementList[page][page_index] = new MenuElement(
				global.imageManager.imageMap[itemName],
				x,
				ItemPanel.inner_margin, ItemPanel.element_size, ItemPanel.element_size,
				() => { }
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
		this.pageNextButton = new MenuElement(
			global.imageManager.imageMap["menu_pageNext"],
			head_x + (ItemPanel.element_size + ItemPanel.between_element_space) * ItemPanel.page_element_max - ItemPanel.between_element_space + ItemPanel.between_page_button_space,
			ItemPanel.inner_margin, ItemPanel.page_button_size, ItemPanel.element_size,
			() => {
				if (this.page < this.elementList.length - 1) {
					this.setPage(this.page + 1);
				}
			}
		);

		this.setPage(0);
	}

	update(canvasDrawer: CanvasImageDrawer): MainMenuChangeStatus {
		this.changeStatus = MainMenuChangeStatus.HOLD_PANEL;

		// ほとんど同じ処理なので同じ配列で処理する
		this.elementList[this.page].concat([
			this.pageNextButton,
			this.pagePrevButton,
			this.backButton
		]).forEach((elm: MenuElement) => {
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
		var image = (Array.isArray(elm.img)) ? elm.img[elm.status] : elm.img;
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
			canvasDrawer.drawRect({
				x: elm.x + ItemPanel.element_padding,
				y: elm.y + ItemPanel.element_padding,
				width: elm.width - ItemPanel.element_padding * 2,
				height: elm.height - ItemPanel.element_padding * 2
			}, {r: 64, g: 64, b: 64, a: 255}, false, ItemPanel.element_line_width);
		}

		// 画像の描画
		var image = (Array.isArray(elm.img)) ? elm.img[elm.status] : elm.img;
		canvasDrawer.drawImage(
			elm.getImage(),
			elm.x + Math.floor(elm.width / 2 - image.width / 2),
			elm.y + Math.floor(elm.height / 2 - image.height / 2),
		);
	}

	setPage(page: number): void {
		this.page = page;

		this.pagePrevButton.enable = (this.page != 0);
		this.pageNextButton.enable = (this.page < (this.elementList.length - 1));
	}
}
