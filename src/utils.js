export const currencyFormatter = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
}).format;

export const fixedNumber = (number) => number.toFixed(1);
