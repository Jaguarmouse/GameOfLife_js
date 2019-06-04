let cols;
let rows;

const scl = 10;

const prev = [];
const grid = [];

function setup() {
  createCanvas(600, 600);
  frameRate(10);

  cols = floor(width / scl);
  rows = floor(height / scl);

  for (let i = 0; i < cols + 2; i++) {
    prev[i] = [];
    grid[i] = [];
    for (let j = 0; j < rows + 2; j++) {
      if (i == 0 || i == cols+1 || j == 0 || j == rows + 1) {
        prev[i][j] = 0;
      } else {
        prev[i][j] = floor(random(2));
      }
      grid[i][j] = prev[i][j];
    }
  }
}

function draw() {
  background(0);
  noStroke();

  for (let i = 1; i < cols + 1; i++) {
    for (let j = 1; j < rows + 1; j++) {
      const neighbor = eval(i,j);
      if (prev[i][j]) {
        if (neighbor <= 1 || neighbor >= 4) {
          grid[i][j] = 0;
          continue;
        }
      } else {
        if (neighbor == 3) {
          grid[i][j] = 1;
          continue;
        }
      }
      grid[i][j] = prev[i][j];
    }
  }

  for (let i = 1; i < cols + 1; i++) {
    for (let j = 1; j < rows + 1; j++) {
      if (grid[i][j]) {
          fill(0,255,0);
      } else {
        fill(0);
      }
      rect((i-1)*scl, (j-1)*scl, scl-1, scl-1);
      prev[i][j] = grid[i][j];
    }
  }
}

function eval(ci, cj) {
  let neighbor = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i==0 && j==0) { 
        continue;
      }
      neighbor += prev[ci+i][cj+j];
    }
  }
  return neighbor;
}

