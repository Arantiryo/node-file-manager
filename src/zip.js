import path from "path";
import fs from "fs";
import zlib from "zlib";

export const decompress = (inputFile, outputFile) => {
  const inputPath = path.resolve(process.cwd(), inputFile);
  const outputPath = path.resolve(process.cwd(), outputFile);

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  const brotliDecompress = zlib.createBrotliDecompress();

  readStream.pipe(brotliDecompress).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log(`File decompressed from "${inputFile}" to "${outputFile}"`);
  });

  // Handle errors
  readStream.on("error", (error) => {
    console.error("Operation failed");
  });

  writeStream.on("error", (error) => {
    console.error("Operation failed");
  });
};

export const compress = (inputFile, outputFile) => {
  const inputPath = path.resolve(process.cwd(), inputFile);
  const outputPath = path.resolve(process.cwd(), outputFile);

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  const compress = zlib.createBrotliCompress();

  readStream.pipe(compress).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log(`File compressed from "${inputFile}" to "${outputFile}".`);
  });

  readStream.on("error", (error) => {
    console.error("Operation failed");
  });

  writeStream.on("error", (error) => {
    console.error("Operation failed");
  });
};
