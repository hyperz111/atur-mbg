<script>
	import Table from "./lib/Table.svelte";
	import Settings from "./lib/Settings.svelte";

	let selected = $state({});
	let totals = $state({});
</script>

<header class="text-center my-4">
	<h1 class="text-5xl font-extrabold text-green-400">Atur MBG</h1>
	<p class="text-gray-500">Alat untuk mengatur menu MBG kalian.</p>
	<p class="*:text-blue-600 *:underline *:hover:text-blue-500">
		<a href="https://github.com/hyperz111/atur-mbg" target="_blank">Kode sumber</a>
		•
		<a href="https://id.wikipedia.org/wiki/Makan_Bergizi_Gratis" target="_blank">Apa itu MBG?</a>
	</p>
</header>

<main class="grid grid-cols-1 gap-3">
	<Table {selected} {totals} />
	<Settings {selected} {totals} />
</main>
