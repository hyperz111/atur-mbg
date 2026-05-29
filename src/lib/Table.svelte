<script>
	import foods from "../data/foods.json";
	import { fixedNumber, numberFormatter } from "../utils.js";

	let { selected, totals } = $props();

	let all = $derived.by(() => {
		const result = {};

		for (const category in foods) {
			for (const food of foods[category]) {
				if (selected[food.name]) {
					const servingValue = totals[food.name] ?? food.serving.value;
					const multiplier = servingValue / food.serving.value;

					result[food.name] = {
						serving: {
							value: servingValue,
							unit: food.serving.unit,
						},
						price: food.price * multiplier,
					};

					for (const n in food.nutrition) {
						result[food.name][n] = food.nutrition[n] * multiplier;
					}
				}
			}
		}

		return result;
	});
	let acumulated = $derived.by(() => {
		const result = {
			price: 0,
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
		};

		for (const food in all) {
			const item = all[food];

			for (const property in result) {
				result[property] += item[property];
			}
		}

		return result;
	});
</script>

<section>
	<h2 class="text-4xl font-semibold my-2">Hasil</h2>

	<div class="overflow-x-auto *:w-full">
		<table class="border-collapse">
			<thead>
				<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-400">
					<th>Makanan</th>
					<th>Porsi</th>
					<th>Harga</th>
					<th>Kalori</th>
					<th>Protein</th>
					<th>Karbohidrat</th>
					<th>Lemak</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.entries(all) as [name, info]}
					<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-100">
						<td class="capitalize">{name}</td>
						{#each Object.entries(info) as [key, value]}
							<td>
								{#if key === "serving"}
									{fixedNumber(value.value)} {value.unit}
								{:else if key === "price"}
									{numberFormatter.format(value)}
								{:else if key === "calories"}
									{fixedNumber(value)} kkal
								{:else}
									{fixedNumber(value)} gram
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-300 font-bold">
					<td colspan="2" class="text-center">Total</td>
					{#each Object.entries(acumulated) as [key, value]}
						<td>
							{#if key === "price"}
								{numberFormatter.format(value)}
							{:else if key === "calories"}
								{fixedNumber(value)} kkal
							{:else}
								{fixedNumber(value)} gram
							{/if}
						</td>
					{/each}
				</tr>
			</tfoot>
		</table>
	</div>
</section>
