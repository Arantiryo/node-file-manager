import path from "path";
import fs from "fs";
import crypto from "crypto";

export const hashCommand = async (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);

  const hash = crypto.createHash("sha256");

  const readStream = fs.createReadStream(filePath);

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    const fileHash = hash.digest("hex");
    console.log(`Hash: ${fileHash}`);
  });

  readStream.on("error", (error) => {
    console.error("Operation failed");
  });
};
