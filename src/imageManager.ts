
class ImageManager {
	private static imagePathArray = [
		"img/cellSize_big.png",
		"img/cellSize_mid.png",
		"img/cellSize_small.png",
		"img/window_full.png",
		"img/window_normal.png",
	];
	static imageMap: {[key: string]: HTMLImageElement} = {};

	static getBaseFileName(path: string): string {
		// ディレクトリ指定を除去
		return path.slice(
			path.lastIndexOf("/") + 1,
			path.lastIndexOf(".") - path.length
		);
	}

	static load(): void {
		ImageManager.imagePathArray.forEach((path: string) => {
			const image: HTMLImageElement = <HTMLImageElement>document.createElement("img");
			image.src = path;
			ImageManager.imageMap[ImageManager.getBaseFileName(path)] = image;
		});
	}

	static checkLoadCompleted(): boolean {
		for (var key in ImageManager.imageMap) {
			var image: any = ImageManager.imageMap[key];
			if (!(image.complete || image.readyState === "complete")) {
				return false;
			}
		}

		return true;
	}
}