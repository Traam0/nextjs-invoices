import ApexCharts, { ApexOptions } from "apexcharts";
import { useLayoutEffect, useRef } from "react";

interface AreaCartProps {
	labels: string[];
	data: { name: string; data: Array<number | null> }[];
	marker?: number;
}

export function AreaChart({
	labels,
	data,
	marker,
}: AreaCartProps): JSX.Element {
	// 118ab2 blue ef476f
	const options: ApexOptions = {
		colors: ["#06d6a0", "#fb6f92"],
		chart: {
			id: "incomePerDayChart",
			type: "area",
			height: "450px",
			background: "#f8f9fa",
			zoom: {
				enabled: true,
				type: "y",
				autoScaleYaxis: false,
				zoomedArea: {
					fill: {
						color: "#90CAF9",
						opacity: 0.4,
					},
					stroke: {
						color: "#0D47A1",
						opacity: 0.4,
						width: 1,
					},
				},
			},
		},
		title: {
			text: "Revenu Par Mois",
			align: "center",
			style: {
				fontSize: "20px",
				fontWeight: "bold",
			},
		},
		stroke: { curve: "smooth", width: 4 },
		legend: {
			show: true,
			showForSingleSeries: true,
			position: "top",
			horizontalAlign: "center",
			floating: false,
			labels: {
				colors: ["#F5F5F5"],
				useSeriesColors: true,
			},
		},
		grid: {
			borderColor: "#fff",
			row: {
				colors: ["#caf0f8", "transparent"],
				opacity: 0.2,
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				inverseColors: true,
				opacityFrom: 0.7,
				opacityTo: 0.4,
				stops: [0, 90, 100],
			},
		},
		dataLabels: {
			enabled: true,
			textAnchor: "end",
			background: {
				enabled: true,
				foreColor: "#fff",
				padding: 6,
				borderRadius: 8,
				borderWidth: 0,
				borderColor: "#fff",
				opacity: 0.9,
				dropShadow: {
					enabled: false,
					top: 1,
					left: 1,
					blur: 1,
					color: "#000",
				},
			},
		},
		annotations: {
			yaxis: [
				{
					y: marker,
					borderColor: "#118ab2",

					label: {
						borderColor: "#118ab2",
						textAnchor: "end",
						offsetY: -5,
						style: {
							color: "#fff",
							background: "#118ab2",
							fontSize: "14px",
						},

						text: `Revenu Moyen (${Number(marker).toFixed(2)} dh) `,
						position: "center",
					},
				},
			],
		},

		labels: labels,
		series: data,
	};

	

	const chartRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const chart = new ApexCharts(chartRef.current, options);
		chart.render();
		return () => {
			chart.destroy();
		};
	}, []);

	return <div ref={chartRef}></div>;
}

export default AreaChart;
