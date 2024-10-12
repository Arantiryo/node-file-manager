import os from "os";

export class FileManager {
  // Constructor method to initialize the object
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

      default:
        break;
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
