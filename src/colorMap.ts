
class ColorMap {
	static DIG_LENGTH = 30;
	static DIG_START = 110;

	static createCOCKTAIL(xNum, yNum){
		var result = [];
		for (var y = 0; y < yNum; ++y) {
			result[y] = [];
			for (var x = 0; x < xNum; ++x) {
				var colValue = (x + y) / ((xNum + yNum) / 2);
				if (colValue > 1.0) {
					colValue = 2.0 - colValue;
				}

				var colRate = Math.floor(ColorMap.DIG_LENGTH * colValue);
				var hue = ColorMap.DIG_START + colRate;

				result[y][x] = ColorMap.HSVtoRGB(hue, 90, 100);
			}
		}

		return result;
	}

	static HSVtoRGB(hue, saturation, value): Color {
		var rgb = new Array();
		var h = hue;
		var s = Math.floor(saturation * 2.55);
		var v = Math.floor(value * 2.55);

		while (h < 0) {
			h += 360;
		}
		h = h % 360;

		if (s == 0) {
			v = Math.round(v);
			return { r: v, g: v, b: v, a: 255 };
		}

		s = s / 255;
		var i = Math.floor(h / 60) % 6,
				f = (h / 60) - i,
				p = v * (1 - s),
				q = v * (1 - f * s),
				t = v * (1 - (1 - f) * s)

		switch (i) {
		case 0 :
			return { r: v, g: t, b: p, a: 255 };
		case 1 :
			return { r: q, g: v, b: p, a: 255 };
		case 2 :
			return { r: p, g: v, b: t, a: 255 };
		case 3 :
			return { r: p, g: q, b: v, a: 255 };
		case 4 :
			return { r: t, g: p, b: v, a: 255 };
		case 5 :
			return { r: v, g: p, b: q, a: 255 };
		}

		return null;
	}
}
