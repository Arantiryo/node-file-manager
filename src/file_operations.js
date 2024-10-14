import path from "path";
import fs from "fs";
import fsp from "fs/promises";
import { pipeline } from "stream/promises";

export const deleteFile = async (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);

  await fsp.unlink(filePath);

  console.log(`File deleted: ${filePath}`);
};

export const moveFile = async (sourceFile, destinationFile) => {
  const sourcePath = path.resolve(process.cwd(), sourceFile);
  const destinationPath = path.resolve(process.cwd(), destinationFile);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);

  await pipeline(readStream, writeStream);

  await fsp.unlink(sourcePath);

  console.log(`File moved from ${sourcePath} to ${destinationPath}`);
};

export const copyFile = async (sourceFile, destinationFile) => {
  const sourcePath = path.resolve(process.cwd(), sourceFile);
  const destinationPath = path.resolve(process.cwd(), destinationFile);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);

  await pipeline(readStream, writeStream);

  console.log(`File copied from ${sourcePath} to ${destinationPath}`);
};

export const renameFile = async (oldName, newName) => {
  const oldPath = path.resolve(process.cwd(), oldName);
  const newPath = path.resolve(process.cwd(), newName);

  await fsp.rename(oldPath, newPath);

  console.log(`File renamed from ${oldName} to ${newName}`);
};

export const cat = (filePath) => {
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

  readStream.on("data", (chunk) => {
    console.log(chunk);
  });

  readStream.on("error", (error) => {
    console.error("Operation failed");
  });
};

export const createFile = async (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);
  const fileHandle = await fsp.open(filePath, "w");

  await fileHandle.close();

  console.log(`Empty file created: ${filePath}`);
};
