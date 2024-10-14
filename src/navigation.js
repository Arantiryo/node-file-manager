import path from "path";
import fsp from "fs/promises";

export const list = async () => {
  const currentDir = process.cwd();
  const items = await fsp.readdir(currentDir, { withFileTypes: true });

  const fileList = items
    .map((item) => ({
      name: item.name,
      type: item.isDirectory() ? "Directory" : "File",
    }))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "Directory" ? -1 : 1;

      a.type.localeCompare(b.type);
    });

  console.table(fileList);
};

export const changeDirectory = async (pathToDirectory) => {
  const targetPath = path.resolve(pathToDirectory);

  const stats = await fsp.stat(targetPath);

  if (stats.isDirectory()) {
    process.chdir(targetPath);
    console.log(`Changed directory to: ${process.cwd()}`);
  } else {
    console.error(`The specified path is not a directory: ${targetPath}`);
  }
};

export const goUp = () => {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  if (currentDir === parentDir) {
    console.log("You are already in the root directory. Cannot go up further.");
    return;
  }

  process.chdir(parentDir);
  console.log(`Changed directory to: ${process.cwd()}`);
};
