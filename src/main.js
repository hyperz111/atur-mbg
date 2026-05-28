import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const app = mount(App, {
	target: document.getElementById("app"),
});

if (import.meta.env.DEV) {
	await import("eruda").then(({ default: eruda }) => {
		eruda.init();
	});
}

export default app;
