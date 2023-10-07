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

		// Event listeners
		{
			// Panning
			this.canvas.addEventListener("mousedown", this.panStart.bind(this));
			this.canvas.addEventListener("mousemove", this.panMove.bind(this));
			this.canvas.addEventListener("mouseup", this.panEnd.bind(this));
			this.canvas.addEventListener("mouseleave", this.panEnd.bind(this));

			// Drawing on Touch
			this.canvas.addEventListener("touchstart", this.drawStart.bind(this));
			this.canvas.addEventListener("touchmove", this.drawMove.bind(this));
			this.canvas.addEventListener("touchend", this.drawEnd.bind(this));
			this.canvas.addEventListener("touchcancel", this.drawEnd.bind(this));

			// Drawing on Pen
			this.canvas.addEventListener("pointerdown", this.drawStart.bind(this));
			this.canvas.addEventListener("pointermove", this.drawMove.bind(this));
			this.canvas.addEventListener("pointerup", this.drawEnd.bind(this));
			this.canvas.addEventListener("pointerleave", this.drawEnd.bind(this));

			// Zoom
			this.canvas.addEventListener("wheel", this.zoom.bind(this));

			// Resize
			window.addEventListener("resize", this.resize.bind(this));
		}
	}

	// Redraw
	redraw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawPaths.forEach((path) => {
			this.ctx.save();
			
			switch (path.type) {
				case "start":
					this.ctx.translate(this.origin.x - path.translate.x, this.origin.y - path.translate.y);
					this.ctx.scale(this.zoomLevel / path.scale, this.zoomLevel / path.scale);
					this.ctx.beginPath();
					this.ctx.moveTo(path.x, path.y);
					break;
					case "draw":
					this.ctx.translate(this.origin.x - path.translate.x, this.origin.y - path.translate.y);
					this.ctx.scale(this.zoomLevel / path.scale, this.zoomLevel / path.scale);
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

		const dx = e.clientX - this.panStartPos.x;
		const dy = e.clientY - this.panStartPos.y;

		// Adjust for the current zoom level
		this.origin.x += dx;
		this.origin.y += dy;

		this.panStartPos.x = e.clientX;
		this.panStartPos.y = e.clientY;

		this.redraw(); // Update the canvas after panning
	}

	panEnd(e) {
		this.isPanning = false;
		this.canvas.classList.remove("is-panning");
	}

	// Draw
	drawStart(e) {
		this.isDrawing = true;

		this.ctx.beginPath();
		this.ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);

		this.drawPaths.push({
			type: "start",
			x: e.touches[0].clientX + this.origin.x,
			y: e.touches[0].clientY + this.origin.y,
			translate: { x: this.origin.x, y: this.origin.y },
			scale: this.zoomLevel,
		});
	}

	drawMove(e) {
		if (!this.isDrawing) return;

		this.ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
		this.ctx.stroke();

		this.drawPaths.push({
			type: "draw",
			x: e.touches[0].clientX + this.origin.x,
			y: e.touches[0].clientY + this.origin.y,
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

		const prevZoomLevel = this.zoomLevel;
		this.zoomLevel = Math.min(
			Math.max(this.zoomLimit.lower, this.zoomLevel - e.deltaY * this.zoomSpeed),
			this.zoomLimit.upper
		);

		this.redraw();
	}

	// Resize
	resize() {
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;

		this.redraw();
	}
}
