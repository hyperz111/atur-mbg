<script>
	import Table from "./lib/Table.svelte";
	import Settings from "./lib/Settings.svelte";

	let selected = $state({});
	let totals = $state({});
</script>

<header class="text-center my-4">
	<h1 class="text-5xl font-extrabold text-green-400 flex items-center justify-center gap-2">
		Atur MBG
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
			><path d="M0 0h24v24H0z" fill="none" /><path
				fill="currentColor"
				d="M6 22v-9.15q-1.35-.35-2.175-1.425T3 9V2h2v6h1V2h2v6h1V2h2v7q0 1.35-.825 2.425T8 12.85V22zm10 0v-9.525q-1.35-.45-2.175-1.887T13 7.325Q13 5.1 14.175 3.55T17 2t2.825 1.562T21 7.35q0 1.825-.825 3.25T18 12.475V22z" /></svg>
	</h1>
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
