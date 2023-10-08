/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");

slate = new Slate(canvas);

const keyMap = ["Pan", "Pencil", "Eraser"];

function changeTool(key) {
	slate.toolSelected = keyMap[key - 1];

	const tools = document.querySelectorAll(".tool");

	tools.forEach((tool) => {
		if (tool.getAttribute("data-tool") === keyMap[key - 1]) {
			tool.classList.add("active");
		} else {
			tool.classList.remove("active");
		}
	});
}

window.addEventListener("keypress", (e) => {
	const key = e.key;
	if (key < "1" || key > "2") return;
	changeTool(parseInt(key));
});

function toggleSidebar() {
	const sidebar = document.querySelector(".sidebar");
	sidebar.classList.toggle("hidden");
}

function shrinkSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("shrinked");
}