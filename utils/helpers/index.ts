import { shuffle } from "lodash";
import { pad } from "./padNumber";
// import { addListingToLS } from "./";

function randomColor(): string {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export { shuffle, randomColor, pad };
