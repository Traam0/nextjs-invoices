import _ from "lodash";

export function addListingToLS({
	listing,
}: {
	_id: string;
	title: string;
	price: number;
	image: string;
	date: string;
	city: string;
}): void {
	if (localStorage.getItem("listings@recent")) {
		const recents: (typeof listing)[] = JSON.parse(
			localStorage.getItem("listings@recent") as string
		);

		if (recents.length >= 20) {
			recents.shift();
			localStorage.setItem(
				"listing@recent",
				JSON.stringify(_.union(recents, [listing]))
			);
			return;
		} else {
			localStorage.setItem(
				"listings@recent",
				JSON.stringify(_.union(recents, [listing]))
			);
			// console.log(_.union(recents, [listing]));
			return;
		}
	} else {
		localStorage.setItem("listings@recent", JSON.stringify([listing]));
		return;
	}
}
