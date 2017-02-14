
/**
 * マップを表すクラス。
 */
class CellMap {
	xNum: number;
	yNum: number;
	map: boolean[][];
	alternateMap: boolean[][];
	savedMap: boolean[][];
	private generation: number;
	private population: number;

	constructor(xNum: number, yNum: number) {
		this.xNum = xNum;
		this.yNum = yNum;
		this.map = [];
		this.alternateMap = [];
		this.savedMap = null;
		for (var y = 0; y < this.yNum; y++) {
			this.map[y] = [];
			this.alternateMap[y] = [];
		}

		this.randomize();
		this.generation = 0;
		this.population = 0;
	}

	calcCell(cx: number, cy: number): number {
		var aliveCellCount = 0;
		for (var y = -1; y < 2; ++y) {
			for (var x = -1; x < 2; ++x) {
				if ((x == 0 && x == y) || x + cx < 0 || x + cx >= this.xNum || y + cy < 0 || y + cy >= this.yNum) continue;
				if (this.map[y + cy][x + cx]) {
					aliveCellCount++;
				}
			}
		}

		if (aliveCellCount < 2) return -1;
		if (aliveCellCount == 3) return 1;
		if (aliveCellCount > 3) return -1;
		return 0;
	}

	alternate(): void {
		this.population = 0;

		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				const state = this.calcCell(x, y);
				if(state == -1){
					this.alternateMap[y][x] = false;
				} else if(state == 1){
					this.alternateMap[y][x] = true;
				} else {
					this.alternateMap[y][x] = this.map[y][x];
				}

				if (this.alternateMap[y][x]) {
					++this.population;
				}
			}
		}
		this.generation++;

		// 世代交代用マップと現在のマップを入れ替え
		const temp = this.map;
		this.map = this.alternateMap;
		this.alternateMap = temp;
	}

	clear(): void {
		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				this.map[y][x] = false;
			}
		}
		this.generation = 0;
		this.population = 0;
	}

	randomize(): void {
		this.clear();
		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				var rand = Math.floor(Math.random() * 4);
				if (rand == 0) {
					this.map[y][x] = true;
					this.population++;
				} else {
					this.map[y][x] = false;
				}
			}
		}
	}

	copy(srcMap: boolean[][], srcXNum?: number, srcYNum?: number): void {
		if (!srcXNum) srcXNum = srcMap[0].length;
		if (!srcYNum) srcYNum = srcMap.length;
		const dstXNum = this.xNum;
		const dstYNum = this.yNum;

		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				if (y < srcYNum && x < srcXNum && srcMap[y][x]) {
					this.map[y][x] = true;
				} else {
					this.map[y][x] = false;
				}
			}
		}
	}

	save(): void {
		this.alternateMap = [];
		for (var y = 0; y < this.yNum; ++y) {
			this.alternateMap[y] = [];
		}

		this.savedMap = [];
		for (var y = 0; y < this.yNum; ++y) {
			this.savedMap[y] = [];
			for (var x = 0; x < this.xNum; ++x) {
				this.savedMap[y][x] = this.map[y][x];
			}
		}
	}

	load(): void {
		this.copy(this.savedMap);
	}

	canLoad(): boolean {
		return this.savedMap != null;
	}

	setCell(x: number, y: number, cell: boolean): void {
		this.map[y][x] = cell;
	}

	setCellNum(xNum: number, yNum: number): void {
		const temp = this.map;
		const tempX = this.xNum;
		const tempY = this.yNum;

		this.xNum = xNum;
		this.yNum = yNum;

		this.map = [];
		this.alternateMap = [];
		for (var y = 0; y < this.yNum; ++y) {
			this.map[y] = [];
			this.alternateMap[y] = [];
		}
		this.copy(temp, tempX, tempY);
	}

	setTemplate(template: number[][], leftAlignment: boolean = false): void {
		this.clear();

		// マップの中心に来るように位置を調整
		var setX = (leftAlignment) ? 0 : Math.floor(this.xNum / 2 - template[0].length / 2);
		var setY = Math.floor(this.yNum / 2 - template.length / 2);

		for(var y = 0; y < template.length && y < this.map.length; ++y){
			for(var x = 0; x < template[y].length && x < this.map[y].length; ++x){
				if(template[y][x] == 1) {
					this.map[setY + y][setX + x] = true;
				}
			}
		}
	}

	plantStamp(stampMap: number[][], x0: number, y0: number): void {
		for(var y = y0; y < y0 + stampMap.length; ++y){
			for(var x = x0; x < x0 + stampMap[0].length; ++x){
				if(stampMap[y - y0][x - x0] == 1){
					this.map[y][x] = true;
				}
			}
		}
	}
}
