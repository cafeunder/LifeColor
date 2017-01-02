
enum CellStatus {
	/**
	 * 死状態
	 */
	DEAD,

	/**
	 * 生状態
	 */
	ALIVE,

	/**
	 * 死状態に移行中
	 */
	DIE,

	/**
	 * 生状態に移行中
	 */
	BIRTH
}

class CellMap {
	xNum: number;
	yNum: number;
	map: CellStatus[][];
	generation: number;
	population: number;

	constructor(xNum: number, yNum: number, srcCellMap?: CellMap) {
		this.xNum = xNum;
		this.yNum = yNum;
		if (srcCellMap) {
			this.copyMap(srcCellMap.map, srcCellMap.xNum, srcCellMap.yNum);
		} else {
			this.map = [];
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
				if (this.map[y + cy][x + cx] == CellStatus.ALIVE || this.map[y + cy][x + cx] == CellStatus.DIE) {
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
		this.completeStatus();
		this.population = 0;

		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				const state = this.calcCell(x, y);
				if(state == -1){
					if (this.map[y][x] == CellStatus.ALIVE) {
						this.map[y][x] = CellStatus.DIE;
					}
				}
				if(state == 1){
					if (this.map[y][x] == CellStatus.DEAD) {
						this.map[y][x] = CellStatus.BIRTH;
					}
				}

				if (this.map[y][x] == CellStatus.ALIVE || this.map[y][x] == CellStatus.BIRTH) {
					++this.population;
				}
			}
		}

		this.generation++;
	}

	completeStatus(): void {
		for (var y = 0; y < this.yNum; ++y) {
			for (var x = 0; x < this.xNum; ++x) {
				if (this.map[y][x] == CellStatus.BIRTH) {
					this.map[y][x] = CellStatus.ALIVE;
				}
				if (this.map[y][x] == CellStatus.DIE) {
					this.map[y][x] = CellStatus.DEAD;
				}
			}
		}
	}

	private _clear(): void {
		this.map = [];
		this.generation = 0;
		this.population = 0;
	}

	clear(): void {
		this._clear();
		for (var y = 0; y < this.yNum; ++y) {
			this.map[y] = [];
			for (var x = 0; x < this.xNum; ++x) {
				this.map[y][x] = CellStatus.DEAD;
			}
		}
	}

	randomize(): void {
		this._clear();
		for (var y = 0; y < this.yNum; ++y) {
			this.map[y] = [];
			for (var x = 0; x < this.xNum; ++x) {
				var rand = Math.floor( Math.random() * 4);
				if (rand == 0) {
					this.map[y][x] = CellStatus.ALIVE;
					this.population++;
				} else {
					this.map[y][x] = CellStatus.DEAD;
				}
			}
		}
	}

	copyMap(srcMap: CellStatus[][], srcXNum: number, srcYNum: number): void {
		const dstXNum = this.xNum;
		const dstYNum = this.yNum;

		// TODO:
		// 下のfor文とマージできるのでは
		this.map = [];
		for(var y = 0; y < this.yNum; y++){
			this.map[y] = [];
		}

		for(var y = 0; y < this.yNum; ++y){
			for(var x = 0; x < this.xNum; ++x){
				if((y < srcYNum && x < srcXNum) && (srcMap[y][x] == CellStatus.BIRTH || srcMap[y][x] == CellStatus.ALIVE)){
					this.map[y][x] = CellStatus.ALIVE;
				} else {
					this.map[y][x] = CellStatus.DEAD;
				}
			}
		}
	}
}