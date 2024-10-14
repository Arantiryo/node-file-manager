import os from "os";
import path from "path";
import fs from "fs";
import fsp from "fs/promises";
import { pipeline } from "stream/promises";
import crypto from "crypto";

export class FileManager {
  constructor(name) {
    this.userName = name;
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
    rn: this.renameFile,
    cp: this.copyFile,
    mv: this.moveFile,
    rm: this.deleteFile,
    os: this.os,
    hash: this.hash,
  };

  async handleCommand(input) {
    const [command, ...args] = input.split(" ");

    if (this.commands[command]) {
      try {
        await this.commands[command](...args);
      } catch (error) {
        console.error("Operation failed");
      }
    } else {
      console.error("Invalid input");
    }
  }

  async hash(fileName) {
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
  }

  os(flag) {
    if (flag === "--EOL") {
      console.log(`Default End-Of-Line character: ${JSON.stringify(os.EOL)}`);
      return;
    }

    if (flag === "--cpus") {
      const cpus = os.cpus();
      const cpuCount = cpus.length;

      console.log(`Overall number of CPUs: ${cpuCount}`);

      const cpusToPrint = cpus.map((cpu) => ({
        model: cpu.model,
        clockSpeed: (cpu.speed / 1000).toFixed(2),
      }));

      console.table(cpusToPrint);
      return;
    }

    if (flag === "--homedir") {
      console.log(`Home directory: ${os.homedir()}`);
      return;
    }

    if (flag === "--username") {
      const userInfo = os.userInfo();
      const userName = userInfo.username;

      console.log(`System user name: ${userName}`);
      return;
    }

    if (flag === "--architecture") {
      console.log(`CPU architecture: ${process.arch}`);
      return;
    }

    console.error("Invalid input");
  }

  async deleteFile(fileName) {
    const filePath = path.resolve(process.cwd(), fileName);

    await fsp.unlink(filePath);

    console.log(`File deleted: ${filePath}`);
  }

  async moveFile(sourceFile, destinationFile) {
    const sourcePath = path.resolve(process.cwd(), sourceFile);
    const destinationPath = path.resolve(process.cwd(), destinationFile);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);

    await pipeline(readStream, writeStream);

    await fsp.unlink(sourcePath);

    console.log(`File moved from ${sourcePath} to ${destinationPath}`);
  }

  async copyFile(sourceFile, destinationFile) {
    const sourcePath = path.resolve(process.cwd(), sourceFile);
    const destinationPath = path.resolve(process.cwd(), destinationFile);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);

    await pipeline(readStream, writeStream);

    console.log(`File copied from ${sourcePath} to ${destinationPath}`);
  }

  async renameFile(oldName, newName) {
    const oldPath = path.resolve(process.cwd(), oldName);
    const newPath = path.resolve(process.cwd(), newName);

    await fsp.rename(oldPath, newPath);

    console.log(`File renamed from ${oldName} to ${newName}`);
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
    const filePath = path.resolve(process.cwd(), fileName);
    const fileHandle = await fsp.open(filePath, "w");

    await fileHandle.close();

    console.log(`Empty file created: ${filePath}`);
  }

  async list() {
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
      process.chdir(os.homedir());
      console.log("Changed working directory to:", process.cwd());
    } catch (err) {
      console.error("Failed to change directory:", err);
    }
  }
}
