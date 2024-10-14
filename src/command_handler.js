import { userName } from "../index.js";
import { sayGoodbye } from "./utils.js";
import { goUp, changeDirectory, list } from "./navigation.js";
import {
  cat,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
} from "./file_operations.js";
import { osCommand } from "./os.js";
import { hashCommand } from "./hash.js";
import { compress, decompress } from "./zip.js";

const commands = {
  ".exit": () => sayGoodbye(userName),
  up: goUp,
  cd: changeDirectory,
  ls: list,
  cat: cat,
  add: createFile,
  rn: renameFile,
  cp: copyFile,
  mv: moveFile,
  rm: deleteFile,
  os: osCommand,
  hash: hashCommand,
  compress: compress,
  decompress: decompress,
};

export const handleCommand = async (input) => {
  const [command, ...args] = input.split(" ");

  if (commands[command]) {
    try {
      await commands[command](...args);
    } catch (error) {
      console.error("Operation failed");
    }
  } else {
    console.error("Invalid input");
  }
};
