export class FileManager {
  // Constructor method to initialize the object
  constructor(name) {
    this.userName = name;
  }

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
}
