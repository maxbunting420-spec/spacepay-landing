import { createCanvas, loadImage } from "canvas";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const logosDir = join(publicDir, "logos");

// All unique logos — 36 total (12 per plane, no repeats)
const allLogos = [
  // Plane 1 (Back) — 12 logos
  "spacepay.png",              // SpacePay (center placement in back plane)
  "wallets/metamask.png",
  "wallets/coinbase.png",
  "wallets/phantom.png",
  "wallets/rainbow.png",
  "wallets/walletconnect.png",
  "wallets/rabby.png",
  "wallets/zerion.png",
  "wallets/brave.png",
  "wallets/safe.png",
  "wallets/trustwallet.png",
  "wallets/ledger.png",

  // Plane 2 (Mid) — 12 logos
  "wallets/trezor.png",
  "wallets/exodus.png",
  "wallets/uniswap.png",
  "wallets/1inch.png",
  "networks/ethereum.png",
  "networks/polygon.png",
  "networks/arbitrum.png",
  "networks/solana.png",
  "networks/base.png",
  "networks/optimism.png",
  "networks/bnb.png",
  "networks/gnosis.png",

  // Plane 3 (Front) — 12 logos
  "networks/avalanche.png",
  "networks/tron.png",
  "networks/fantom.png",
  "networks/cosmos.png",
  "networks/near.png",
  "networks/sui.png",
  "networks/aptos.png",
  "networks/stellar.png",
  "networks/polkadot.png",
  "networks/cardano.png",
  "networks/chainlink.png",
  "networks/zksync.png",
];

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Detect icon positions from original framer image via flood fill.
 */
function detectIcons(data, w, h) {
  const map = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3] > 200) map[i] = 1;
  }
  const visited = new Uint8Array(w * h);
  const icons = [];

  function floodFill(sx, sy) {
    const stack = [[sx, sy]];
    let minX = sx, maxX = sx, minY = sy, maxY = sy;
    let count = 0;
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const idx = y * w + x;
      if (visited[idx] || !map[idx]) continue;
      visited[idx] = 1;
      count++;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    }
    return { minX, maxX, minY, maxY, count };
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (map[idx] && !visited[idx]) {
        const blob = floodFill(x, y);
        const bw = blob.maxX - blob.minX + 1;
        const bh = blob.maxY - blob.minY + 1;
        if (bw >= 15 && bh >= 15 && bw < w * 0.25 && bh < h * 0.25 && blob.count > 100) {
          icons.push({
            cx: (blob.minX + blob.maxX) / 2,
            cy: (blob.minY + blob.maxY) / 2,
            size: Math.max(bw, bh),
          });
        }
      }
    }
  }
  return icons;
}

/**
 * Generate a complete replacement image for one plane.
 * Detects exact icon positions from original, draws crypto logos at those spots.
 */
async function generatePlane(originalUrl, outputName, logoSlice) {
  console.log(`Processing ${outputName}...`);

  const original = await loadImage(originalUrl);
  const w = original.width;
  const h = original.height;

  const detectCanvas = createCanvas(w, h);
  const detectCtx = detectCanvas.getContext("2d");
  detectCtx.drawImage(original, 0, 0);
  const detectData = detectCtx.getImageData(0, 0, w, h);
  const icons = detectIcons(detectData.data, w, h);
  console.log(`  Found ${icons.length} icons in ${w}x${h}`);

  icons.forEach((ic, i) => {
    console.log(`  Icon ${i}: cx=${Math.round(ic.cx)}, cy=${Math.round(ic.cy)}, size=${Math.round(ic.size)}`);
  });

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    const logoFile = logoSlice[i % logoSlice.length];
    const logoPath = join(logosDir, logoFile);

    let img;
    try {
      img = await loadImage(logoPath);
    } catch (e) {
      console.log(`  Warning: could not load ${logoPath}: ${e.message}`);
      continue;
    }

    const cx = icon.cx;
    const cy = icon.cy;
    const iconSize = icon.size;
    const half = iconSize / 2;
    const cornerR = iconSize * 0.22;

    ctx.save();
    ctx.translate(cx, cy);

    // Shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = iconSize * 0.15;
    ctx.shadowOffsetY = iconSize * 0.04;

    // White rounded rect background
    roundedRect(ctx, -half, -half, iconSize, iconSize, cornerR);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Subtle border
    roundedRect(ctx, -half, -half, iconSize, iconSize, cornerR);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw logo clipped to rounded rect
    ctx.save();
    roundedRect(ctx, -half, -half, iconSize, iconSize, cornerR);
    ctx.clip();
    ctx.drawImage(img, -half, -half, iconSize, iconSize);
    ctx.restore();

    ctx.restore();
  }

  const buffer = canvas.toBuffer("image/png");
  const outPath = join(publicDir, outputName);
  writeFileSync(outPath, buffer);
  console.log(`  -> Saved ${outPath} (${w}x${h})\n`);
}

async function main() {
  console.log("Generating hero plane images with 36 unique logos...\n");

  // Split logos: 12 per plane, all unique
  const backLogos = allLogos.slice(0, 12);
  const midLogos = allLogos.slice(12, 24);
  const frontLogos = allLogos.slice(24, 36);

  console.log(`Back plane logos: ${backLogos.join(", ")}`);
  console.log(`Mid plane logos: ${midLogos.join(", ")}`);
  console.log(`Front plane logos: ${frontLogos.join(", ")}\n`);

  // Back plane - 2048x2047
  await generatePlane(
    "https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048",
    "hero-plane-back.png",
    backLogos
  );

  // Mid plane - 1024x1024
  await generatePlane(
    "https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024",
    "hero-plane-mid.png",
    midLogos
  );

  // Front plane - 1385x1385
  await generatePlane(
    "https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png",
    "hero-plane-front.png",
    frontLogos
  );

  console.log("Done! All 36 logos unique across all three planes.");
}

main().catch(console.error);
