
interface Pattern {
	map: number[][];
	explain: string;
}

class StampPattern {
	static makeItemPanelElementData(): ItemPanelElementData[] {
		var result: ItemPanelElementData[] = [];
		for (var key in StampPattern.list) {
			result.push({
				name: key,
				explain: StampPattern.list[key].explain
			});
		}
		return result;
	}

	static list: {[key: string]: Pattern} = {
		"stamp_block": {
			map: [
				[1,1],
				[1,1]
			],
			explain: "#cブロック [Block]#w：サイズ4の固定物体。最も頻繁に自然発生する。"
		},
		"stamp_tab": {
			map: [
				[0,1,0],
				[1,0,1],
				[0,1,0],
			],
			explain: "#cタブ [Tab]#w：サイズ4の固定物体。単純な形だが、あまり自然発生しない。"
		}
	};
}
