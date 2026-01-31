import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "logos", "spacepay.png");

// Create a 512x512 SpacePay logo icon
// Design: A bold "S" shape made from two arrows pointing in opposite directions
// suggesting payment flow — on a gradient background (indigo to blue)
const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext("2d");

// Background: rounded square with gradient
const cornerR = size * 0.22;
ctx.beginPath();
ctx.moveTo(cornerR, 0);
ctx.lineTo(size - cornerR, 0);
ctx.quadraticCurveTo(size, 0, size, cornerR);
ctx.lineTo(size, size - cornerR);
ctx.quadraticCurveTo(size, size, size - cornerR, size);
ctx.lineTo(cornerR, size);
ctx.quadraticCurveTo(0, size, 0, size - cornerR);
ctx.lineTo(0, cornerR);
ctx.quadraticCurveTo(0, 0, cornerR, 0);
ctx.closePath();

// Gradient: deep indigo to vibrant blue
const grad = ctx.createLinearGradient(0, 0, size, size);
grad.addColorStop(0, "#4F46E5"); // indigo-600
grad.addColorStop(1, "#2563EB"); // blue-600
ctx.fillStyle = grad;
ctx.fill();

// Draw a stylized "S" made of two curved arrow-like segments
// This creates a payment/transfer feel
ctx.strokeStyle = "#ffffff";
ctx.fillStyle = "#ffffff";
ctx.lineCap = "round";
ctx.lineJoin = "round";

const cx = size / 2;
const cy = size / 2;

// Bold "S" path — two connected arcs
ctx.lineWidth = size * 0.07;
ctx.beginPath();

// Top part of S: arc going right
const r = size * 0.17;
const topCy = cy - r * 0.9;
const botCy = cy + r * 0.9;

// Draw S shape using bezier curves
ctx.moveTo(cx + r * 0.9, topCy - r * 0.5);
// Top arc curving right then left
ctx.bezierCurveTo(
  cx + r * 1.3, topCy - r * 0.1,
  cx + r * 1.3, topCy + r * 1.0,
  cx, topCy + r * 0.6
);
// Bottom arc curving left then right
ctx.bezierCurveTo(
  cx - r * 1.3, botCy - r * 1.0,
  cx - r * 1.3, botCy + r * 0.1,
  cx - r * 0.9, botCy + r * 0.5
);

ctx.stroke();

// Small arrow heads at both ends
const arrowSize = size * 0.06;

// Top arrow (pointing right-up)
ctx.beginPath();
ctx.moveTo(cx + r * 0.9, topCy - r * 0.5);
ctx.lineTo(cx + r * 0.9 - arrowSize * 1.5, topCy - r * 0.5 - arrowSize * 0.3);
ctx.lineTo(cx + r * 0.9 - arrowSize * 0.3, topCy - r * 0.5 + arrowSize * 1.5);
ctx.closePath();
ctx.fill();

// Bottom arrow (pointing left-down)
ctx.beginPath();
ctx.moveTo(cx - r * 0.9, botCy + r * 0.5);
ctx.lineTo(cx - r * 0.9 + arrowSize * 1.5, botCy + r * 0.5 + arrowSize * 0.3);
ctx.lineTo(cx - r * 0.9 + arrowSize * 0.3, botCy + r * 0.5 - arrowSize * 1.5);
ctx.closePath();
ctx.fill();

// Two small horizontal lines through the S (dollar sign style, subtle)
ctx.lineWidth = size * 0.025;
ctx.beginPath();
ctx.moveTo(cx, cy - r * 1.8);
ctx.lineTo(cx, cy - r * 1.3);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cx, cy + r * 1.3);
ctx.lineTo(cx, cy + r * 1.8);
ctx.stroke();

const buffer = canvas.toBuffer("image/png");
writeFileSync(outPath, buffer);
console.log(`SpacePay logo saved to ${outPath}`);
