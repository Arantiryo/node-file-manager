import os from "os";
import path from "path";
import fs from "fs";

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
  };

  handleCommand(input) {
    const [command, ...args] = input.split(" ");

    if (this.commands[command]) {
      this.commands[command](...args);
    } else {
      console.error("Invalid input");
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
