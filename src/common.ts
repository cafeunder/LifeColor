
/**
 * 8ビットカラーを表すインターフェイス（0~255）
 */
interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}

/**
 * 矩形を表すインターフェイス
 */
interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}
