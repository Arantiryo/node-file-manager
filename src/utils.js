import os from "os";

export const sayHello = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export const sayGoodbye = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};

export const switchToHomeDir = () => {
  try {
    process.chdir(os.homedir());
    console.log("Changed working directory to:", process.cwd());
  } catch (err) {
    console.error("Failed to change directory:", err);
  }
};

export const printCWD = () => {
  console.log("\x1b[36m", `You are currently in ${process.cwd()}`, "\x1b[0m");
};
