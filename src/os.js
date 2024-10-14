import os from "os";

export const osCommand = (flag) => {
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
};
