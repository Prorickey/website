let dots: Dot[] = [];
let width = 0;
let height = 0;
const speedFactor = 0.5;

export interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

export interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

self.onmessage = function (e) {
  const { type } = e.data;

  switch (type) {
    case 'init':
      width = e.data.width;
      height = e.data.height;
      initializeDots(e.data.numDots);
      break;

    case 'resize':
      width = e.data.width;
      height = e.data.height;
      break;

    case 'animate':
      const { updatedDots } = updatePositions();
      self.postMessage({ dots: updatedDots });
      break;
  }
};

function initializeDots(numDots: number) {
  dots = [];
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * speedFactor,
      dy: (Math.random() - 0.5) * speedFactor,
      radius: Math.floor(Math.random()) + 1,
    });
  }
}

function updatePositions() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    // Update position
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x < 0 || dot.x > width) {
      dot.dx = -dot.dx;
      dot.x = dot.x < 0 ? 0 : width;
    }
    if (dot.y < 0 || dot.y > height) {
      dot.dy = -dot.dy;
      dot.y = dot.y < 0 ? 0 : height;
    }
  }

  return {
    updatedDots: dots.map((d) => ({
      x: d.x,
      y: d.y,
      radius: d.radius,
    })),
  };
}
