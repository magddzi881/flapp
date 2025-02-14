const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const splitFlowers = async () => {
  const imagePath = path.join(__dirname, 'flowers.jpg');
  const outputDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const image = sharp(imagePath);
  const { width, height } = await image.metadata();

  const flowerWidth = Math.floor(width / 3);
  const flowerHeight = Math.floor(height / 4);

  console.log(`Image dimensions: ${width}x${height}`);
  console.log(`Flower dimensions: ${flowerWidth}x${flowerHeight}`);

  for (let i = 0; i < 12; i++) {
    const x = (i % 3) * flowerWidth;
    const y = Math.floor(i / 3) * flowerHeight;

    console.log(`Extracting flower ${i + 1} at (${x}, ${y})`);

    const extractWidth = (x + flowerWidth > width) ? width - x : flowerWidth;
    const extractHeight = (y + flowerHeight > height) ? height - y : flowerHeight;

    await image
      .extract({ left: x, top: y, width: extractWidth, height: extractHeight })
      .toFile(path.join(outputDir, `flower${i + 1}.png`));
  }
};

splitFlowers().catch(err => console.error(err));
