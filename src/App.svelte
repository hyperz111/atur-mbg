<script>
	import Table from "./lib/Table.svelte";
	import Settings from "./lib/Settings.svelte";
	import foods from "./data/foods.json";
	import { numberFormatter } from "./utils.js";

	let selected = $state({});
	let totals = $state({});
	let analysisResult = $derived.by(() => {
		const foodsResult = {};
		for (const category in foods) {
			for (const food of foods[category]) {
				if (selected[food.name]) {
					const object = (foodsResult[food.name] = {});

					const { serving } = food;
					const total = totals[food.name] ?? serving.value;
					object.serving = {
						value: total,
						unit: serving.unit,
					};

					const multiplier = total / serving.value;

					object.price = food.price * multiplier;
					for (const n in food.nutrition) {
						object[n] = food.nutrition[n] * multiplier;
					}
				}
			}
		}

		const total = {
			price: 0,
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		};
		for (const food in foodsResult) {
			const item = foodsResult[food];

			for (const property in total) {
				total[property] += item[property];
			}
		}

		return { foods: foodsResult, total };
	});
</script>

<header class="text-center">
	<h1 class="text-5xl font-extrabold">Atur MBG</h1>
	<p class="text-gray-500">Alat untuk mengatur isi ompreng MBG kalian. Bisa dipakai untuk analisa.</p>
</header>

<main class="grid grid-cols-1 gap-3">
	<Table data={analysisResult} />
	<Settings bind:selected bind:totals />
</main>
