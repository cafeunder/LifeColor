
class ImageManager {
	private static imagePathArray = [
		"img/cellSize_big.png",
		"img/cellSize_mid.png",
		"img/cellSize_small.png",
		"img/window_full.png",
		"img/window_normal.png",
		"img/menu_clear.png",
		"img/menu_fast.png",
		"img/menu_grid.png",
		"img/menu_load.png",
		"img/menu_pencil.png",
		"img/menu_eraser.png",
		"img/menu_random.png",
		"img/menu_play.png",
		"img/menu_save.png",
		"img/menu_slow.png",
		"img/menu_stamp.png",
		"img/menu_stop.png",
		"img/menu_template.png"
	];

	imageMap: {[key: string]: HTMLImageElement} = {};

	getBaseFileName(path: string): string {
		// ディレクトリ指定を除去
		return path.slice(
			path.lastIndexOf("/") + 1,
			path.lastIndexOf(".") - path.length
		);
	}

	load(): void {
		ImageManager.imagePathArray.forEach((path: string) => {
			const image: HTMLImageElement = <HTMLImageElement>document.createElement("img");
			image.src = path;
			this.imageMap[this.getBaseFileName(path)] = image;
		});
	}

	checkLoadCompleted(): boolean {
		for (var key in this.imageMap) {
			var image: any = this.imageMap[key];
			if (!(image.complete || image.readyState === "complete")) {
				return false;
			}
		}

		return true;
	}

	getImageList(keyList: string[]): HTMLImageElement[] {
		var result = [];
		keyList.forEach((key: string) => {
			result.push(this.imageMap[key]);
		});
		return result;
	}
}