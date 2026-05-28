<script>
	import Table from "./lib/Table.svelte";
	import Settings from "./lib/Settings.svelte";

	let selected = $state({});
	let totals = $state({});
</script>

<header class="text-center">
	<h1 class="text-5xl font-extrabold">Atur MBG</h1>
	<p class="text-gray-500">Alat untuk mengatur isi ompreng MBG kalian. Bisa dipakai untuk analisa.</p>
</header>

<main class="grid grid-cols-1 gap-3">
	<Table {selected} {totals} />
	<Settings {selected} {totals} />
</main>
