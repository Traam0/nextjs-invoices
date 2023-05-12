export function pad(number: number, length: number = 2): string {
	var str = "" + number;
	if (number < 10) {
		while (str.length < length) {
			str = "0" + str;
		}
	}

	return str;
}
