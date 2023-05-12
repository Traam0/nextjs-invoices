import { Invoice, Item } from "@/utils/types";
import { IconFileInvoice } from "@tabler/icons-react";
import {
	format,
	getDate,
	getDay,
	getMonth,
	getYear,
	parse,
	parseISO,
} from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface GenerateInvoiceProps {
	handleClick: (callBack?: Function) => void;
}

var comapnyData = {
	CompanyName: "Moussaid Design",
	CNI: "K449069",
	autoEntrepreneur: "AE-171004-524763",
	ICE: "001989261000017",
	IF: "24876137",
	taxPro: "29400393",
	cnss: "113905634",
	address: "Res.Al Boustane L Said Hajji Im G7 A11-Sale",
	phone: "06.04.07.06.09",
	mail: "moussaif.design@gmail.com",
};

const fontSizes = {
	HeadTitleFontSize: 18,
	Head2TitleFontSize: 16,
	TitleFontSize: 14,
	SubTitleFontSize: 12,
	NormalFontSize: 10,
	SmallFontSize: 8,
};

var lineSpacing = {
	NormalSpacing: 12,
};

function getFooterData(invoice: Invoice) {
	if (invoice.avance <= 0) {
		return [
			["", "", "", "", "", "Total", Number(invoice.total).toFixed(2)],
			["", "", "", "", "", "TVA", String(invoice.TVA * 100 + " %")],
			["", "", "", "", "", "Total TTC", Number(invoice.totalTTC).toFixed(2)],
		];
	} else {
		return [
			["", "", "", "", "", "Total", Number(invoice.total).toFixed(2)],
			["", "", "", "", "", "TVA", String(invoice.TVA * 100 + " %")],
			["", "", "", "", "", "Total TTC", Number(invoice.totalTTC).toFixed(2)],
			["", "", "", "", "", "Avance", Number(invoice.avance).toFixed(2)],
			["", "", "", "", "", "Rest", Number(invoice.rest).toFixed(2)],
		];
	}
}

export function GenerateInvoice({ handleClick }: GenerateInvoiceProps) {
	//

	function generateInvoicePDF(invoice: Invoice): void {
		// alert(`gen pdf `);
		const document = new jsPDF("p", "pt", "a4");
		const rightStartCol1 = 365;
		const rightStartCol2 = 435;
		const InitialstartX = 40;
		const startX = 40;
		const InitialstartY = 50;
		var startY = 0;
		const lineHeights = 12;
		const logo_D = 100;
		const fonts = document.getFontList();

		document.setFontSize(fontSizes.SubTitleFontSize);
		document.setFont("helvetica", "bold");
		document.addImage(
			"./logo_b.png",
			"PNG",
			startX,
			(startY += 50),
			logo_D,
			logo_D
		);
		document.text(comapnyData.CompanyName, startX, (startY += 10 + logo_D), {
			align: "left",
		});

		document.setFontSize(fontSizes.NormalFontSize); // 5 => 80

		// document.text(
		// 	"Auto Entrepreneur :",
		// 	startX,
		// 	(startY += lineSpacing.NormalSpacing + 2)
		// );
		// document.setFont("helvetica", "normal");
		// document.text(comapnyData.autoEntrepreneur, 140, startY);

		document.setFont("helvetica", "bold");
		document.text("RC :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.CNI, 70, startY);

		document.setFont("helvetica", "bold");
		document.text("ICE :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.ICE, 70, startY);

		document.setFont("helvetica", "bold");
		document.text("IF :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.IF, 60, startY);

		document.setFont("helvetica", "bold");
		document.text(
			"Numero TAX :",
			startX,
			(startY += lineSpacing.NormalSpacing)
		);
		document.setFont("helvetica", "normal");
		document.text(comapnyData.IF, 110, startY);

		document.setFont("helvetica", "bold");
		document.text("CNSS :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.cnss, 80, startY);

		document.setFont("helvetica", "bold");
		document.text("Address :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.address, 90, startY);

		document.setFont("helvetica", "bold");
		document.text("GSM :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.phone, 80, startY);

		document.setFont("helvetica", "bold");
		document.text("email :", startX, (startY += lineSpacing.NormalSpacing));
		document.setFont("helvetica", "normal");
		document.text(comapnyData.mail, 80, startY);

		var tempY = InitialstartY;
		// ==========================

		document.setFontSize(fontSizes.NormalFontSize);

		document.setFont("helvetica", "bold");
		document.text(
			"Client :",
			rightStartCol1,
			(tempY += lineSpacing.NormalSpacing)
		);
		document.setFont("helvetica", "normal");
		document.text(invoice.client_name, rightStartCol1 + 40, tempY);

		if (invoice.client_type !== "Client Passage") {
			document.setFont("helvetica", "bold");
			document.text(
				"ICE :",
				rightStartCol1,
				(tempY += lineSpacing.NormalSpacing)
			);
			document.setFont("helvetica", "normal");
			document.text(invoice.client_ice as string, rightStartCol1 + 40, tempY);

			document.setFont("helvetica", "bold");
			document.text(
				"Phone :",
				rightStartCol1,
				(tempY += lineSpacing.NormalSpacing)
			);
			document.setFont("helvetica", "normal");
			document.text(invoice.client_phone as string, rightStartCol1 + 40, tempY);

			if (invoice.client_website) {
				document.setFont("helvetica", "bold");
				document.text(
					"site :",
					rightStartCol1,
					(tempY += lineSpacing.NormalSpacing)
				);
				document.setFont("helvetica", "normal");
				document.text(
					invoice.client_website as string,
					rightStartCol1 + 40,
					tempY
				);
			}

			document.setFont("helvetica", "bold");
			document.text(
				"Address :",
				rightStartCol1,
				(tempY += lineSpacing.NormalSpacing)
			);
			document.setFont("helvetica", "normal");
			document.text(
				invoice.client_address as string,
				rightStartCol1 + 50,
				tempY,
				{
					maxWidth: 200,
				}
			);
		}

		tempY += 12;

		const lineStartY = (tempY += lineSpacing.NormalSpacing);

		document.line(rightStartCol1 - 10, lineStartY, 580, lineStartY);

		tempY += 12;

		document.setFont("helvetica", "bold");
		document.text(
			"Facture NO: ",
			rightStartCol1,
			(tempY += lineSpacing.NormalSpacing)
		);
		document.setFont("helvetica", "normal");
		document.text(invoice._id, rightStartCol2, tempY);

		document.setFont("helvetica", "bold");
		document.text(
			"Date Facture: ",
			rightStartCol1,
			(tempY += lineSpacing.NormalSpacing)
		);
		document.setFont("helvetica", "normal");
		document.text(
			format(parseISO(invoice.updatedAt), "dd-MM-yyyy"),
			438,
			tempY
		);

		document.setFont("helvetica", "bold");
		document.text(
			"Total TTC: ",
			rightStartCol1,
			(tempY += lineSpacing.NormalSpacing + 3)
		);
		document.setFont("helvetica", "normal");
		document.text(String(invoice.totalTTC + " DH"), 422, tempY);

		document.setFont("helvetica", "normal");
		document.setLineWidth(1);

		startY += 10;

		document.setFontSize(fontSizes.NormalFontSize);

		document.setFont("helvetica", "bold");

		autoTable(document, {
			columns: [
				...[
					"Numro",
					"Produit",
					"Description",
					"Type",
					"Prix",
					"Quantite",
					"Valeur",
				],
			],
			body: [
				...invoice.items.map((item, index) => [
					index + 1,
					item.product,
					item.description ? item.description : "Pas de description",
					item.type,
					item.price,
					item.quantity,
					item.total,
				]),
			],
			startY: (startY += 2 * lineSpacing.NormalSpacing),
			foot: getFooterData(invoice),
			footStyles: {
				fillColor: "white",
				textColor: "black",
				fontStyle: "normal",
				cellPadding: 5,
				lineColor: "black",
			},
		});

		document.save(
			`${invoice._id}(${format(parseISO(invoice.updatedAt), "dd-MM-yyyy")}).pdf`
		);
	}

	return (
		<button
			type="button"
			className="px-4 align-baseline mb-1 flex items-center gap-2 font-medium bg-red-100 text-red-700 ring-2 ring-offset-2 ring-red-500 py-2 rounded-lg min-w-fit focus:ring-4 focus:outline-none hover:bg-red-50 hover:text-red-700"
			onClick={() => {
				handleClick(generateInvoicePDF);
			}}
		>
			<IconFileInvoice /> PDF
		</button>
	);
}
