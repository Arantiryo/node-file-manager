import os from "os";
import path from "path";
import fs from "fs";
import fsp from "fs/promises";

export class FileManager {
  constructor(name) {
    this.userName = name;
    this.homeDir = os.homedir();
  }

  static printCWD = () => {
    console.log(`You are currently in ${process.cwd()}`);
  };

  commands = {
    ".exit": this.sayGoodbye,
    up: this.goUp,
    cd: this.changeDirectory,
    ls: this.list,
    cat: this.cat,
    add: this.createFile,
  };

  handleCommand(input) {
    const [command, ...args] = input.split(" ");

    if (this.commands[command]) {
      this.commands[command](...args);
    } else {
      console.error("Invalid input");
    }
  }

  cat(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

    readStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readStream.on("error", (error) => {
      console.error("Operation failed");
    });
  }

  async createFile(fileName) {
    try {
      const filePath = path.resolve(process.cwd(), fileName);
      const fileHandle = await fsp.open(filePath, "w");

      await fileHandle.close();

      console.log(`Empty file created: ${filePath}`);
    } catch (error) {
      console.error("Operation failed");
    }
  }

  async list() {
    try {
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
    } catch (error) {
      console.error("Operation failed");
    }
  }

  changeDirectory(pathToDirectory) {
    const targetPath = path.resolve(pathToDirectory);

    if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
      process.chdir(targetPath);
      console.log(`Changed directory to: ${process.cwd()}`);
    } else {
      console.error(
        `The specified path does not exist or is not a directory: ${targetPath}`
      );
    }
  }

  goUp() {
    try {
      const currentDir = process.cwd();
      const parentDir = path.dirname(currentDir);

      if (currentDir === parentDir) {
        console.log(
          "You are already in the root directory. Cannot go up further."
        );
        return;
      }

      process.chdir(parentDir);
      console.log(`Changed directory to: ${process.cwd()}`);
    } catch (error) {
      console.error("Operation failed", error);
    }
  }

  sayHello() {
    console.log(`Welcome to the File Manager, ${this.userName}!`);
  }

  sayGoodbye() {
    console.log(`Thank you for using File Manager, ${this.userName}, goodbye!`);
    process.exit(0);
  }

  switchToHomeDir() {
    try {
      process.chdir(this.homeDir);
      console.log("Changed working directory to:", process.cwd());
    } catch (err) {
      console.error("Failed to change directory:", err);
    }
  }
}
