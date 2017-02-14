
/**
 * パターンとその説明、左揃えにするかどうか。
 */
interface TemplatePattern extends Pattern {
	leftAlignment: boolean;
}

/**
 * テンプレート機能で使えるパターンの一覧を提供するクラス。
 */
class TemplatePattern {
	static makeItemPanelElementData(): ItemPanelElementData[] {
		var result: ItemPanelElementData[] = [];
		for (var key in TemplatePattern.list) {
			result.push({
				name: key,
				explain: TemplatePattern.list[key].explain
			});
		}
		return result;
	}

	static list: {[key: string]: TemplatePattern} = {
		"template_lake": {
			map: [
				[0,0,0,0,1,1,0,0,0,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,1,1,0,1,1,0,1,1,0],
				[1,0,0,1,0,0,1,0,0,1],
				[1,0,0,1,0,0,1,0,0,1],
				[0,1,1,0,1,1,0,1,1,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,0,0,0,1,1,0,0,0,0],
			],
			explain: "#c湖 [Lake]#w：固定物体の#c池#wが集まったもの。法則さえ守ればいくらでも大きくできる。",
			leftAlignment: false
		},
		"template_bakery": {
			map: [
				[0,0,0,0,1,1,0,0,0,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,0,0,1,0,1,0,0,0,0],
				[0,1,1,0,1,0,0,0,1,0],
				[1,0,0,1,0,0,0,1,0,1],
				[1,0,1,0,0,0,1,0,0,1],
				[0,1,0,0,0,1,0,1,1,0],
				[0,0,0,0,1,0,1,0,0,0],
				[0,0,0,1,0,0,1,0,0,0],
				[0,0,0,0,1,1,0,0,0,0],
			],
			explain: "#cベーカリー [Bakery]#w：固定物体の#cパン#wが集まったもの。法則さえ守ればいくらでも長くできる。",
			leftAlignment: false
		},
		"template_phoenix1": {
			map: [
				[0,0,0,1,0,0,0,0],
				[0,0,0,1,0,1,0,0],
				[0,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0],
				[0,0,1,0,1,0,0,0],
				[0,0,0,0,1,0,0,0]
			],
			explain: "#cフェニックス1 [Phoenix1]#w：周期2の振動子。フェニックスと呼ばれるパターンのうち、最小のもの。",
			leftAlignment: false
		},
		"template_galaxy": {
			map: [
				[1,1,0,1,1,1,1,1,1],
				[1,1,0,1,1,1,1,1,1],
				[1,1,0,0,0,0,0,0,0],
				[1,1,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,1,1],
				[0,0,0,0,0,0,0,1,1],
				[1,1,1,1,1,1,0,1,1],
				[1,1,1,1,1,1,0,1,1]
			],
			explain: "#c銀河 [Galaxy]#w：周期8の振動子。",
			leftAlignment: false
		},
		"template_eight": {
			map: [
				[1,1,1,0,0,0],
				[1,1,1,0,0,0],
				[1,1,1,0,0,0],
				[0,0,0,1,1,1],
				[0,0,0,1,1,1],
				[0,0,0,1,1,1]
			],
			explain: "#c八の字 [Figure eight]#w：周期8の振動子。アラビア数字の8。",
			leftAlignment: false
		},
		"template_pentadecathlon": {
			map: [
				[0,0,1,0,0,0,0,1,0,0],
				[1,1,0,1,1,1,1,0,1,1],
				[0,0,1,0,0,0,0,1,0,0],
			],
			explain: "#cペンタデカスロン [Pentadecathlon]#w：周期15の振動子。ペンタデカスロンとは、15種目競技のこと。",
			leftAlignment: false
		},
		"template_pulsar": {
			map: [
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
				[0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
				[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
				[0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
				[1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
			],
			explain: "#cパルサー [Pulsar]#w：周期3の振動子。パルサーとは、電磁波を放射する天体のこと。",
			leftAlignment: false
		},
		"template_clock2": {
			map: [
				[0,0,0,0,0,0,1,1,0,0,0,0],
				[0,0,0,0,0,0,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,1,1,0,0,0,0],
				[1,1,0,1,0,0,0,0,1,0,0,0],
				[1,1,0,1,0,0,1,0,1,0,0,0],
				[0,0,0,1,0,0,1,0,1,0,1,1],
				[0,0,0,1,0,1,0,0,1,0,1,1],
				[0,0,0,0,1,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,0,0,0],
			],
			explain: "#c時計2 [Clock2]#w：周期4の振動子。",
			leftAlignment: false
		},
		"template_hertz": {
			map: [
				[0,0,0,0,0,1,1,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,1,0,0,0,1,1,1,1,0,0,0,1,1],
				[1,0,1,0,1,0,0,0,0,1,0,1,0,1],
				[0,0,1,0,1,1,0,0,0,1,0,1,0,0],
				[1,0,1,0,1,0,0,0,0,1,0,1,0,1],
				[1,1,0,0,0,1,1,1,1,0,0,0,1,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,1,0,0,0,0,0],
			],
			explain: "#cヘルツ発振器 [Hertz oscillator]#w：周期8の振動子。ヘルツ発振器の説明をするには、余白が狭すぎる。",
			leftAlignment: false
		},
		"template_glasses": {
			map: [
				[0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0],
				[0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,1,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,0],
				[1,1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1],
				[0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0],
				[0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,0],
				[0,0,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,0],
			],
			explain: "#cめがね [Glasses]#w：周期2の振動子。",
			leftAlignment: false
		},
		"template_1234": {
			map: [
				[0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,1,0,1,0,0,0,0],
				[0,0,0,1,0,1,0,1,0,0,0],
				[0,0,0,1,0,0,0,1,0,0,0],
				[1,1,0,1,0,1,0,1,0,1,1],
				[1,0,1,0,0,0,0,0,1,0,1],
				[0,0,0,1,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,1,0,1,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0],
			],
			explain: "#c1-2-3-4 [1-2-3-4]#w：周期4の振動子。真ん中のセルの個数が、1、2、3、4と変わっていく。",
			leftAlignment: false
		},
		"template_cauldron": {
			map: [
				[0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,1,0,1,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,1,1,0,0,0],
				[1,0,1,0,0,0,0,0,1,0,1],
				[1,1,0,1,0,0,0,1,0,1,1],
				[0,0,0,1,0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0,1,0,0,0],
				[0,0,0,0,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,1,0,0,0],
				[0,0,0,0,1,0,1,1,0,0,0],
			],
			explain: "#c大釜 [Cauldron]#w：周期8の振動子。",
			leftAlignment: false
		},
		"template_harbor": {
			map: [
				[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
				[0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
				[1,1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,1],
				[1,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[1,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1],
				[1,1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,1],
				[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
			],
			explain: "#c港 [Harbor]#w：周期5の振動子。#cボート#wと#c船#wのみで構成されている。",
			leftAlignment: false
		},
		"template_barberpole": {
			map: [
				[0,0,0,0,0,0,0,0,0,0,1,1],
				[0,0,0,0,0,0,0,0,0,1,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,0,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,1,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0,0,0],
				[1,1,0,0,0,0,0,0,0,0,0,0],
			],
			explain: "#cサインポール [Barber pole]#w：周期2の振動子。法則さえ守れば、斜めにいくらでも長くできる。",
			leftAlignment: false
		},
		"template_carnival_shuttle": {
			map: [
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,],
				[0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,],
				[0,1,0,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,1,1,0,],
				[0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,],
				[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			],
			explain: "#cカーニバルシャトル [Carnival shuttle]#w：周期12の振動子。",
			leftAlignment: false
		},
		"template_toadflipper": {
			map: [
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0],
				[1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
			],
			explain: "#cカエルの足ひれ [Toad Flippers]#w：周期60の振動子。30世代目に、真ん中のヒキガエルが反転する。",
			leftAlignment: false
		},
		"template_tumbler": {
			map: [
				[0,1,0,0,0,0,0,1,0],
				[1,0,1,0,0,0,1,0,1],
				[1,0,0,1,0,1,0,0,1],
				[0,0,1,0,0,0,1,0,0],
				[0,0,1,1,0,1,1,0,0],
			],
			explain: "#cタンブラー [Tumbler]#w：周期14の振動子。名前の由来は、上下逆さまな形になることから。",
			leftAlignment: false
		},
		"template_fly": {
			map: [
				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
				[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0],
				[0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0,0],
				[0,1,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0],
				[0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0],
				[0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,1,1,0,1,0,1,0,0,0,0,1,1,0,0,0],
				[0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,1,1,1,0,1,0,1,0,0,0,0,1,1,0,0,0],
				[0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0],
				[0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
			],
			explain: "#cハエ [Fly]#w：周期3の移動物体。",
			leftAlignment: false
		},
		"template_brain": {
			map: [
				[0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0],
				[1,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1],
				[1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
				[0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0],
				[0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
				[0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0],
				[0,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,0],
				[0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0],
				[0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0],
				[0,1,0,0,0,0,1,1,0,1,1,0,0,0,0,1,0],
				[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
			],
			explain: "#c脳 [Brain]#w：周期3の移動物体。上に移動する。",
			leftAlignment: false
		},
		"template_hammerhead": {
			map: [
				[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0],
				[1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1],
				[0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1],
				[0,0,0,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0],
				[0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0],
				[0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0],
				[0,0,0,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0],
				[0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1],
				[1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0],
				[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
			],
			explain: "#cハンマーヘッド [Hammerhead]#w：周期4の移動物体。",
			leftAlignment: false
		},
		"template_thunderbird": {
			map: [
				[1,1,1],
				[0,0,0],
				[0,1,0],
				[0,1,0],
				[0,1,0],
			],
			explain: "#cサンダーバード [Thunderbird]#w：最大寿命243世代の長寿型。線対称に広がっていく。",
			leftAlignment: false
		},
		"template_rpento": {
			map: [
				[1,1,0],
				[0,1,1],
				[0,1,0],
			],
			explain: "#cRペントミノ [R-pentomino]#w：最大寿命1103世代の長寿型。Tテトロミノにひとつ足した形。",
			leftAlignment: false
		},
		"template_switchengine": {
			map: [
				[0,1,0,1,0,0],
				[1,0,0,0,0,0],
				[0,1,0,0,1,0],
				[0,0,0,1,1,1],
			],
			explain: "#cスイッチ機関車 [Switch engine]#w：最大寿命3911世代の長寿型。",
			leftAlignment: false
		},
		"template_acorn": {
			map: [
				[0,1,0,0,0,0,0],
				[0,0,0,1,0,0,0],
				[1,1,0,0,1,1,1],
			],
			explain: "#cどんぐり [Acorn]#w：最大寿命5206世代の長寿型。",
			leftAlignment: false
		},
		"template_5x5": {
			map: [
				[1,1,1,0,1],
				[1,0,0,0,0],
				[0,0,0,1,1],
				[0,1,1,0,1],
				[1,0,1,0,1],
			],
			explain: "#cPaul Callahanの5×5 [Paul Callahan's 5×5]#w：繁殖型。無限にセル数が増えていくパターン。",
			leftAlignment: false
		},
		"template_glidergun": {
			map: [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
				[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			],
			explain: "#cグライダー銃 [Glider gun]#w：繁殖型。無限にグライダーを産み出し続ける。",
			leftAlignment: false
		},
		"template_max": {
			map: [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,1,1,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,],
				[1,1,1,1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,0,0,0,],
				[1,0,0,0,1,1,0,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,],
				[1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				[0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0,],
				[0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,],
				[1,0,0,0,0,0,1,1,0,0,0,1,0,1,0,1,0,0,0,1,1,0,0,0,0,0,1,0,],
				[1,0,0,0,1,1,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0,1,1,0,0,1,0,0,],
				[1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,1,0,1,1,0,0,1,0,0,],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,],
				[0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,0,1,0,],
				[0,0,1,1,1,0,1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,1,0,],
				[0,0,1,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,1,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,1,1,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
				[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			],
			explain: "#cマックス [Max]#w：繁殖型。マップが無限なら、どこまでも大きくなり続ける。",
			leftAlignment: false
		},
		"template_wickstretcher1": {
			map: [
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,1,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,1,0,0,1,0,0,0,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,0,0,0,1,1,0,0,1,1,0,1],
				[0,1,0,1,0,0,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
				[1,1,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,1,0,0,0,0,1,1,0,1],
				[0,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,1,0,1,1,0,0,1,0,0,0,1,0,1,0,1,1,0,0,1,0,1,1,0,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
				[0,0,1,0,0,0,1,1,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,1,0,1,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,1,0,0,0,0,1,1,0,1],
				[0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,0,0,0,1,1,0,0,1,1,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			],
			explain: "#cWickstretcher1#w：マップが無限なら、永遠に伸びるパターン。右側は#c蟻#wを生み出し、左側が回収する。",
			leftAlignment: true
		},
		"template_ttetromino": {
			map: [
				[1,1,1],
				[0,1,0],
			],
			explain: "#cTテトロミノ [T-Tetromino]#w：9世代後にブリンカーを4つ生み出す。良く自然発生するパターン。",
			leftAlignment: false
		},
		"template_apiary": {
			map: [
				[0,0,1,0,0],
				[0,1,0,1,0],
				[1,1,0,1,1],
				[0,1,0,1,0],
				[0,0,1,0,0],
			],
			explain: "#c養蜂場 [Apiary]#w：14世代後に蜂の巣を4つ生み出す。良く自然発生するパターン。",
			leftAlignment: false
		},
		"template_eatloaf": {
			map: [
				[0,0,1,0,0,0,0,0,0],
				[0,1,0,1,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0],
				[0,1,1,0,0,1,1,0,0],
				[0,0,0,0,0,1,0,1,0],
				[0,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,0,1,1],
			],
			explain: "#cパンを食べる [Eating a loaf]#w：#cパン#wを食べる#cイーター1#w。食べさせかたにコツがいる。",
			leftAlignment: false
		},
		"template_eatglider": {
			map: [
				[0,0,1,0,0,0,0,0],
				[1,0,1,0,0,0,0,0],
				[0,1,1,0,0,0,0,0],
				[0,0,0,0,1,1,0,0],
				[0,0,0,0,1,0,1,0],
				[0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,1,1],
			],
			explain: "#cグライダーを食べる [Eating a glider]#w：#cグライダー#wを食べる#cイーター1#w。いくらでも食える。",
			leftAlignment: false
		},
		"template_flowerofeden": {
			map: [
				[0,1,1,1,0,0,1,1,0,0,0],
				[0,1,1,0,1,0,1,0,1,1,1],
				[0,1,1,1,0,0,1,1,1,1,1],
				[1,0,1,0,1,0,1,0,1,0,1],
				[1,1,1,1,0,1,0,1,0,1,0],
				[0,0,0,0,1,1,1,0,0,0,0],
				[0,1,0,1,0,1,0,1,1,1,1],
				[1,0,1,0,1,0,1,0,1,0,1],
				[1,1,1,1,1,0,0,1,1,1,0],
				[1,1,1,0,1,0,1,0,1,1,0],
				[0,0,0,1,1,0,0,1,1,1,0]
			],
			explain: "#cエデンの花 [Flower of Eden]#w：エデンの園配置と呼ばれる、初期配置以外に出現しないパターン。",
			leftAlignment: false
		},
	};
}
