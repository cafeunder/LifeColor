
/**
 * 画像の読み込みを行うクラス。
 */
class ImageManager {
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

	// 読み込む画像
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
		"img/menu_template.png",
		"img/menu_back.png",
		"img/menu_pagePrev.png",
		"img/menu_pageNext.png",
		"img/menu_color.png",
		"img/stamp_block.png",
		"img/stamp_tab.png",
		"img/stamp_boat.png",
		"img/stamp_beehive.png",
		"img/stamp_ship.png",
		"img/stamp_carrier.png",
		"img/stamp_barge.png",
		"img/stamp_loaf.png",
		"img/stamp_pond.png",
		"img/stamp_mango.png",
		"img/stamp_canoe.png",
		"img/stamp_blinker.png",
		"img/stamp_toad.png",
		"img/stamp_beacon.png",
		"img/stamp_clock1.png",
		"img/stamp_glider.png",
		"img/stamp_LWSS.png",
		"img/stamp_MWSS.png",
		"img/stamp_HWSS.png",
		"img/stamp_flyingmachine.png",
		"img/stamp_eater.png",
		"img/stamp_ant.png",
		"img/template_bakery.png",
		"img/template_lake.png",
		"img/template_phoenix1.png",
		"img/template_galaxy.png",
		"img/template_eight.png",
		"img/template_pentadecathlon.png",
		"img/template_pulsar.png",
		"img/template_clock2.png",
		"img/template_hertz.png",
		"img/template_glasses.png",
		"img/template_1234.png",
		"img/template_cauldron.png",
		"img/template_harbor.png",
		"img/template_barberpole.png",
		"img/template_carnival_shuttle.png",
		"img/template_toadflipper.png",
		"img/template_tumbler.png",
		"img/template_fly.png",
		"img/template_brain.png",
		"img/template_hammerhead.png",
		"img/template_thunderbird.png",
		"img/template_rpento.png",
		"img/template_switchengine.png",
		"img/template_acorn.png",
		"img/template_5x5.png",
		"img/template_glidergun.png",
		"img/template_max.png",
		"img/template_wickstretcher1.png",
		"img/template_ttetromino.png",
		"img/template_apiary.png",
		"img/template_eatloaf.png",
		"img/template_eatglider.png",
		"img/template_flowerofeden.png"
	];
}
