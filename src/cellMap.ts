
class CellMap {
	xNum: number;
	yNum: number;
	map: boolean[][];
	alternateMap: boolean[][];
	generation: number;
	population: number;

	constructor(xNum: number, yNum: number, srcCellMap?: CellMap) {
		this.xNum = xNum;
		this.yNum = yNum;

		this.map = [];
		this.alternateMap = [];
		for (var y = 0; y < this.yNum; y++) {
			this.map[y] = [];
			this.alternateMap[y] = [];
		}

		if (srcCellMap) {
			this.copyMap(srcCellMap.map, srcCellMap.xNum, srcCellMap.yNum);
		} else {
			this.randomize();
		}
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

	copyMap(srcMap: boolean[][], srcXNum: number, srcYNum: number): void {
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
}