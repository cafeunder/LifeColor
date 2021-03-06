
/**
 * パターンとその説明。
 */
interface Pattern {
	map: number[][];
	explain: string;
}

/**
 * スタンプ機能で使えるパターンの一覧を提供するクラス。
 */
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
		},
		"stamp_boat": {
			map: [
				[0,1,0],
				[1,0,1],
				[1,1,0],
			],
			explain: "#cボート [Boat]#w：サイズ5の固定物体。"
		},
		"stamp_beehive": {
			map: [
				[0,1,1,0],
				[1,0,0,1],
				[0,1,1,0],
			],
			explain: "#c蜂の巣 [Beehive]#w：サイズ6の固定物体。ブロックの次に自然発生する確率が高い。"
		},
		"stamp_ship": {
			map: [
				[0,1,1],
				[1,0,1],
				[1,1,0],
			],
			explain: "#c船 [Ship]#w：サイズ6の固定物体。ボートにセルをひとつ足した形。"
		},
		"stamp_carrier": {
			map: [
				[0,0,1,1],
				[1,0,0,1],
				[1,1,0,0],
			],
			explain: "#c空母 [Carrier]#w：サイズ6の固定物体。分離している固定物体では最小のパターン。"
		},
		"stamp_barge": {
			map: [
				[0,0,1,0],
				[0,1,0,1],
				[1,0,1,0],
				[0,1,0,0],
			],
			explain: "#cはしけ [Barge]#w：サイズ6の固定物体。はしけとは、貨物を積むための船のこと。"
		},
		"stamp_loaf": {
			map: [
				[0,0,1,0],
				[0,1,0,1],
				[1,0,0,1],
				[0,1,1,0],
			],
			explain: "#cパン [Loaf]#w：サイズ7の固定物体。サイズが大きい固定物体のなかでは、わりとよく自然発生する。"
		},
		"stamp_pond": {
			map: [
				[0,1,1,0],
				[1,0,0,1],
				[1,0,0,1],
				[0,1,1,0],
			],
			explain: "#c池 [Pond]#w：サイズ8の固定物体。これよりも大きいサイズの固定物体は、滅多に自然発生しない。"
		},
		"stamp_mango": {
			map: [
				[0,0,1,1,0],
				[0,1,0,0,1],
				[1,0,0,1,0],
				[0,1,1,0,0],
			],
			explain: "#cマンゴー [Mango]#w：サイズ8の固定物体。"
		},
		"stamp_canoe": {
			map: [
				[0,0,0,1,1],
				[0,0,0,0,1],
				[0,0,0,1,0],
				[1,0,1,0,0],
				[1,1,0,0,0],
			],
			explain: "#cカヌー [Canoe]#w：サイズ8の固定物体。ヘンな形だが、変形しない。滅多に自然発生しない。"
		},
		"stamp_blinker": {
			map: [
				[1],
				[1],
				[1],
			],
			explain: "#cブリンカー [Blinker]#w：周期2の振動子。頻繁に自然発生する。"
		},
		"stamp_toad": {
			map: [
				[1,0],
				[1,1],
				[1,1],
				[0,1],
			],
			explain: "#cひきがえる [Toad]#w：周期2の振動子。名前の由来は、ひきがえるの喉に似ている（？）ことから。"
		},
		"stamp_beacon": {
			map: [
				[1,1,0,0],
				[1,1,0,0],
				[0,0,1,1],
				[0,0,1,1],
			],
			explain: "#cビーコン [Beacon]#w：周期2の振動子。ビーコンとは、電波を受信する機械のこと。"
		},
		"stamp_clock1": {
			map: [
				[0,0,1,0],
				[1,0,1,0],
				[0,1,0,1],
				[0,1,0,0],
			],
			explain: "#c時計 [Clock]#w：周期2の振動子。"
		},
		"stamp_glider": {
			map: [
				[0,1,0],
				[1,0,0],
				[1,1,1],
			],
			explain: "#cグライダー [Glider]#w：周期4の移動物体。斜めに向かって移動する。わりと自然発生する。"
		},
		"stamp_LWSS": {
			map: [
				[0,1,0,0,1],
				[1,0,0,0,0],
				[1,0,0,0,1],
				[1,1,1,1,0],
			],
			explain: "#c軽量級宇宙船 [Lightweight spaceship]#w：周期4の移動物体。横に向かって移動する。"
		},
		"stamp_MWSS": {
			map: [
				[0,0,0,1,0,0],
				[0,1,0,0,0,1],
				[1,0,0,0,0,0],
				[1,0,0,0,0,1],
				[1,1,1,1,1,0]
			],
			explain: "#c中量級宇宙船 [Middleweight spaceship]#w：周期4の移動物体。分離しているセルをスパークという。"
		},
		"stamp_HWSS": {
			map: [
				[0,0,0,1,1,0,0],
				[0,1,0,0,0,0,1],
				[1,0,0,0,0,0,0],
				[1,0,0,0,0,0,1],
				[1,1,1,1,1,1,0],
			],
			explain: "#c重量級宇宙船 [Heavyweight spaceship]#w：周期4の移動物体。"
		},
		"stamp_flyingmachine": {
			map: [
				[1,1,1,1,0,0,0,0,0],
				[1,0,0,0,1,0,0,0,0],
				[1,0,0,0,0,0,0,0,0],
				[0,1,0,0,1,0,0,1,1],
				[0,0,0,0,0,0,1,1,1],
				[0,1,0,0,1,0,0,1,1],
				[1,0,0,0,0,0,0,0,0],
				[1,0,0,0,1,0,0,0,0],
				[1,1,1,1,0,0,0,0,0],
			],
			explain: "#c飛行機械 [Flying Machine]#w：周期12の移動物体。Puffer Trainと呼ばれるパターンのひとつ。"
		},
		"stamp_eater": {
			map: [
				[1,1,0,0],
				[1,0,1,0],
				[0,0,1,0],
				[0,0,1,1],
			],
			explain: "#cイーター1 [Eater1]#w：サイズ7のイーター。イーターとは、他のパターンを食べる固定物体のこと。"
		},
		"stamp_ant": {
			map: [
				[0,0,1,1],
				[1,1,0,0],
				[1,1,0,0],
				[0,0,1,1],
			],
			explain: "#c蟻 [Ant]#w：特殊なパターン。正面の方向に1セル離して並べると、動いているように見える。"
		}
	};
}
