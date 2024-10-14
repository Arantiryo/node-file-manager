import os from "os";
import path from "path";

export class FileManager {
  constructor(name) {
    this.userName = name;
    this.homeDir = os.homedir();
  }

  static printCWD = () => {
    console.log(`You are currently in ${process.cwd()}`);
  };

  handleCommand(input) {
    switch (input) {
      case ".exit":
        this.sayGoodbye();
        break;

      case "up":
        this.goUp();
        break;

      default:
        break;
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
