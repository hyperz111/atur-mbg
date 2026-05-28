<script>
	import { fixedNumber, numberFormatter } from "../utils.js";

	let { data } = $props();
</script>

<section>
	<h2 class="text-4xl font-semibold my-2">Hasil</h2>

	<div class="overflow-x-auto *:w-full">
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
				{#each Object.entries(data.foods) as [name, info]}
					<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-100">
						<td>{name}</td>
						{#each Object.values(info) as value, index}
							<td>
								{#if typeof value === "object"}
									{fixedNumber(value.value)} {value.unit}
								{:else if index === 1}
									{numberFormatter.format(value)}
								{:else if index === 2}
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
				<tr class="*:p-2 *:border *:border-gray-600 bg-cyan-300">
					<td colspan="2" class="font-bold text-center">Total</td>
					{#each Object.values(data.total) as value, index}
						<td>
							{#if index === 0}
								{numberFormatter.format(value)}
							{:else if index === 1}
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
