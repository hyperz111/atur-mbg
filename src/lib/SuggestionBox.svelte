<script>
	import suggestions from "../data/suggestions.json";
	import foods from "../data/foods.json";

	let { all, acumulated } = $props();

	const iconMappings = {
		warning: "⚠️",
		suggestion: "💡",
	};

	let results = $derived.by(() => {
		const issues = [];
		const issue = (code) => {
			if (Object.hasOwn(suggestions, code)) {
				issues.push({
					code,
					...suggestions[code],
				});
			}
		};

		if (acumulated.price > 15000) {
			issue("BUDGET_HIGH");
		}

		const values = Object.values(all);

		if (!values.some((item) => item.category === "karbohidrat")) {
			issue("NO_CARB");
		}
		if (!values.some((item) => item.category === "protein")) {
			issue("NO_PROTEIN");
		}
		if (!values.some((item) => item.category === "sayur")) {
			issue("NO_VEGETABLE");
		}
		if (!values.some((item) => item.category === "buah")) {
			issue("NO_FRUIT");
		}

		return issues;
	});
</script>

{#if results.length > 0}
	<section class="bg-zinc-400 text-white p-2 mt-2">
		{#each results as item (item.code)}
			<p>{iconMappings[item.type]} {item.message}</p>
		{/each}
	</section>
{/if}
