<script>
	import foods from "../data/foods.json";
	import { numberFormatter } from "../utils.js";

	let { selected = $bindable({}), totals = $bindable({}) } = $props();
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
