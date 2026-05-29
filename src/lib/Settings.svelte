<script>
	import foods from "../data/foods.json";
	import { currencyFormatter } from "../utils.js";

	let { selected, totals } = $props();
</script>

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
								<span class="flex items-center gap-2">
									<label for="{item.name}+checkbox">
										{item.emoji}
										{item.name}
									</label>
								</span>
								<ul class="text-sm mt-1 space-y-1 {selected[item.name] ? 'block' : 'hidden'}">
									<li>
										<b>Porsi:</b>
										<input
											class="bg-gray-300 px-2 text-black"
											type="number"
											placeholder={item.serving.value}
											bind:value={totals[item.name]}
											style="width: {Math.max(String(totals[item.name] || item.serving.value).length + 2, 4)}ch" />
										/ {item.serving.value}
										{item.serving.unit}
									</li>
									<li><b>Harga:</b> {currencyFormatter(item.price)}</li>
									<li><b>Kalori:</b> {item.nutrition.calories} kkal</li>
									<li><b>Protein:</b> {item.nutrition.protein} gram</li>
									<li><b>Karbohidrat:</b> {item.nutrition.carbs} gram</li>
									<li><b>Lemak:</b> {item.nutrition.fat} gram</li>
								</ul>
							</div>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
