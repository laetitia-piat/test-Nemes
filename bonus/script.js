class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radiusNormal = radius;
    this.radiusSelected = radius * 1.8;
    this.selected = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.selected ? this.radiusSelected : this.radiusNormal,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.selected ? "orange" : "blue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  isClicked(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    const r = this.selected ? this.radiusSelected : this.radiusNormal;
    return dx * dx + dy * dy <= r * r;
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

class CanvasManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.radius = 180;
    this.pointsCount = 16;
    this.points = [];
    this.lines = [];
    this.selectedPoint = null;

    this.initPoints();

    // Gestion clic
    this.canvas.addEventListener("click", (e) => this.handleClick(e));

    this.animate();
  }

  initPoints() {
    for (let i = 0; i < this.pointsCount; i++) {
      const angle = ((2 * Math.PI) / this.pointsCount) * i;
      const x = this.cx + this.radius * Math.cos(angle);
      const y = this.cy + this.radius * Math.sin(angle);
      this.points.push(new Point(x, y, 8));
    }
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    for (const point of this.points) {
      if (point.isClicked(mx, my)) {
        if (this.selectedPoint === null) {
          // Premier clic : sélection du point
          point.selected = true;
          this.selectedPoint = point;
        } else if (this.selectedPoint === point) {
          // Clic sur le même point : désélection
          point.selected = false;
          this.selectedPoint = null;
        } else {
          // Deuxième point sélectionné, création d'une ligne
          this.lines.push(new Line(this.selectedPoint, point));
          this.selectedPoint.selected = false;
          this.selectedPoint = null;
        }
        break; // Stop après le premier point cliqué
      }
    }
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "gray";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawCircle();

    for (const line of this.lines) {
      line.draw(this.ctx);
    }

    for (const point of this.points) {
      point.draw(this.ctx);
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Lancement
window.onload = () => {
  new CanvasManager("canvas");
};
