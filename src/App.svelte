<script>
	// Data makanan di-generate oleh AI (ChatGPT)
	import foods from "./foods.json";

	const numberFormatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

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
	<section>
		<h2 class="text-4xl font-semibold my-2">Hasil</h2>

		<div class="overflow-x-auto">
			<table class="border-collapse">
				<thead>
					<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-400">
						<th>Makanan</th>
						<th>Jumlah</th>
						<th>Harga</th>
						<th>Kalori</th>
						<th>Protein</th>
						<th>Karbohidrat</th>
						<th>Lemak</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(analysisResult.foods) as [name, info]}
						<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-100">
							<td>{name}</td>
							{#each Object.values(info) as value, index}
								<td>
									{#if typeof value === "object"}
										{value.value} {value.unit}
									{:else if index === 1}
										{numberFormatter.format(value)}
									{:else if index === 3}
										{value} kkal
									{:else}
										{value} gram
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-300">
						<td colspan="2">Total</td>
						{#each Object.values(analysisResult.total) as value, index}
							<td>
								{#if index === 0}
									{numberFormatter.format(value)}
								{:else if index === 1}
									{value} kkal
								{:else}
									{value} gram
								{/if}
							</td>
						{/each}
					</tr>
				</tfoot>
			</table>
		</div>
	</section>

	<section class="">
		<h2 class="text-4xl font-semibold my-2">Pengaturan</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each Object.entries(foods) as [name, food]}
				<article
					class="border-4 p-3 text-white rounded-xl {(
						(name === 'karbohidrat' && ['border-blue-600', 'bg-blue-400']) ||
						(name === 'protein' && ['border-orange-600', 'bg-orange-400']) ||
						(name === 'buah' && ['border-red-600', 'bg-red-400']) ||
						(name === 'sayur' && ['border-green-600', 'bg-green-400']) ||
						[]
					).join(' ')}">
					<h3 class="uppercase font-semibold text-2xl">{name}</h3>

					<ul>
						{#each food as item (item.name)}
							<li class="flex items-start gap-2">
								<input class="mt-1" type="checkbox" id="{item.name}+checkbox" bind:checked={selected[item.name]} />
								<div>
									<label for="{item.name}+checkbox">
										{item.emoji}
										{item.name}
										({numberFormatter.format(item.price)}, {item.serving.value}
										{item.serving.unit}/porsi)
									</label>
									{#if selected[item.name]}
										<span>
											<input
												class="bg-gray-400 px-2"
												type="number"
												id="{item.name}+total"
												placeholder={item.serving.value}
												bind:value={totals[item.name]} />
											<label for="{item.name}+total">{item.serving.unit}</label>
										</span>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>
</main>
