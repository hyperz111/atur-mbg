<script>
	// Data makanan di-generate oleh AI (ChatGPT)
	import foods from "./foods.json";

	const categoryColors = {
		karbohidrat: ["border-red-600", "bg-red-400"],
	};

	let selected = $state({});
	let totals = $state({});

	let analysisResult = $derived.by(() => {
		const foodsResult = {};
		for (const category in foods) {
			for (const food of foods[category]) {
				if (selected[food.name]) {
					const object = (foodsResult[food.name] = {});

					const total = totals[food.name] ?? food.serving.value;
					object.total = total;

					const multiplier = total / food.serving.value;

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

<main>
	<section>
		{#each Object.entries(foods) as [name, food]}
			<article class="border-4 p-3 {categoryColors[name].join(' ')}">
				<h2 class="uppercase">{name}</h2>
				<ul>
					{#each food as item (item.name)}
						<li class="flex items-start">
							<input type="checkbox" id="{item.name}+checkbox" bind:checked={selected[item.name]} />
							<div>
								<label for="{item.name}+checkbox">
									{item.emoji}
									{item.name}
									(Rp. {item.price}, {item.serving.value}
									{item.serving.unit}/porsi)
								</label>
								{#if selected[item.name]}
									<span>
										<input
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
	</section>
	<section></section>
</main>
