export const numberFormatter = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
});

export const fixedNumber = (number) => number.toFixed(1);
