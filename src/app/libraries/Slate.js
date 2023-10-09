class Slate {
	constructor(canvas) {
		/** @type {HTMLCanvasElement} */
		this.canvas = canvas;
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;

		/** @type {CanvasRenderingContext2D} */
		this.ctx = canvas.getContext("2d");
		this.ctx.strokeStyle = "#f1f1f1";
		this.ctx.lineWidth = 2;
		this.ctx.lineCap = "round";

		this.drawPaths = [];

		this.origin = { x: 0, y: 0 };
		this.panStartPos = { x: 0, y: 0 };

		this.isPanning = false; // Flag to check if user is panning
		this.isDrawing = false; // Flag to check if user is drawing

		this.zoomLevel = 1;
		this.zoomSpeed = 0.005;
		this.zoomLimit = {
			lower: 0.1,
			upper: 5,
		};

		this.toolSelected = "Pan";

		// Event listeners
		{
			// Pointer Events
			this.canvas.addEventListener("pointerdown", this.startHandler.bind(this));
			this.canvas.addEventListener("pointermove", this.moveHandler.bind(this));
			this.canvas.addEventListener("pointerup", this.endHandler.bind(this));
			this.canvas.addEventListener("pointerleave", this.endHandler.bind(this));

			// Zoom
			this.canvas.addEventListener("wheel", this.zoom.bind(this));

			// Resize
			window.addEventListener("resize", this.resize.bind(this));
		}
	}

	// Function to set tool
	setTool(tool) {
		if (tool === this.toolSelected) return;

		if (this.toolSelected === "Pan") this.panEnd();
		if (this.toolSelected === "Pencil") this.drawEnd();

		this.toolSelected = tool;
	}

	// Functions to select appropriate functions according to tool selected
	startHandler(e) {
		if (this.toolSelected === "Pan") this.panStart(e);
		if (this.toolSelected === "Pencil") this.drawStart(e);
	}

	moveHandler(e) {
		e.preventDefault();
		if (this.toolSelected === "Pan") this.panMove(e);
		if (this.toolSelected === "Pencil") this.drawMove(e);
	}

	endHandler(e) {
		if (this.toolSelected === "Pan") this.panEnd(e);
		if (this.toolSelected === "Pencil") this.drawEnd(e);
	}

	// Redraw
	redraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawPaths.forEach((path) => {
			this.ctx.save();

			this.ctx.translate(this.origin.x, this.origin.y);
			this.ctx.scale(this.zoomLevel, this.zoomLevel);

			switch (path.type) {
				case "start":
					this.ctx.translate(-path.translate.x / path.scale, -path.translate.y / path.scale);
					this.ctx.scale(1 / path.scale, 1 / path.scale);
					this.ctx.beginPath();
					this.ctx.moveTo(path.x, path.y);
					break;
				case "draw":
					this.ctx.translate(-path.translate.x / path.scale, -path.translate.y / path.scale);
					this.ctx.scale(1 / path.scale, 1 / path.scale);
					this.ctx.lineTo(path.x, path.y);
					this.ctx.stroke();
					break;
				default:
					this.ctx.closePath();
			}

			this.ctx.restore();
		});
	}

	// Pan
	panStart(e) {
		this.isPanning = true;
		this.canvas.classList.add("is-panning");

		this.panStartPos = {
			x: e.clientX,
			y: e.clientY,
		};
	}

	panMove(e) {
		if (!this.isPanning) return;

		this.origin.x += e.clientX - this.panStartPos.x;
		this.origin.y += e.clientY - this.panStartPos.y;

		this.panStartPos = {
			x: e.clientX,
			y: e.clientY,
		};

		this.redraw();
	}

	panEnd(e) {
		this.isPanning = false;
		this.canvas.classList.remove("is-panning");
	}

	// Draw
	drawStart(e) {		
		this.isDrawing = true;

		this.ctx.beginPath();
		this.ctx.moveTo(e.clientX, e.clientY);

		this.drawPaths.push({
			type: "start",
			x: e.clientX,
			y: e.clientY,
			translate: { x: this.origin.x, y: this.origin.y },
			scale: this.zoomLevel,
		});
	}

	drawMove(e) {
		if (!this.isDrawing) return;

		this.ctx.lineTo(e.clientX, e.clientY);
		this.ctx.stroke();

		this.drawPaths.push({
			type: "draw",
			x: e.clientX,
			y: e.clientY,
			translate: { x: this.origin.x, y: this.origin.y },
			scale: this.zoomLevel,
		});
	}

	drawEnd(e) {
		this.isDrawing = false;
		this.drawPaths.push({ type: "stop" });
		this.ctx.closePath();
	}

	// Zoom
	zoom(e) {
		e.preventDefault();

		this.zoomLevel = Math.min(
			Math.max(this.zoomLimit.lower, this.zoomLevel - e.deltaY * this.zoomSpeed),
			this.zoomLimit.upper
		);

		this.redraw();
	}

	// Resize
	resize() {
		// Store the previous canvas size
		const prevCanvasWidth = this.canvas.width;
		const prevCanvasHeight = this.canvas.height;

		// Resize the canvas
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;

		// Calculate the change in canvas size
		const deltaX = (this.canvas.width - prevCanvasWidth) / 2;
		const deltaY = (this.canvas.height - prevCanvasHeight) / 2;

		// Adjust the origin to keep drawings centered
		this.origin.x += deltaX;
		this.origin.y += deltaY;

		// Update the canvas context for the new canvas size
		this.ctx = this.canvas.getContext("2d");
		this.ctx.strokeStyle = "#f1f1f1";
		this.ctx.lineWidth = 2;
		this.ctx.lineCap = "round";

		this.redraw(); // Redraw the canvas
	}
}

export default Slate;
