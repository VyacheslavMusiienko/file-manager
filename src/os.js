import {EOL, cpus, homedir, userInfo, arch} from 'os';

export const osFunc = async (argOperation) => {
  try {
    switch (argOperation) {
      case '--EOL':
        console.log(`EOL: ${JSON.stringify(EOL)}`);

      case '--cpus':
        const totalCpus = cpus().length;

        const cpusModalSped = cpus().map((cpu, index) => {
          const model = cpu.model;
          const speed = cpu.speed / 1000;
          return `CPU ${index + 1}: ${model}, Clock Rate: ${speed} GHz`;
        });
        console.log(`Total CPUs ${totalCpus}.\n${cpusModalSped.splice(',').join('\n')} `);
        break;

      case '--homedir':
        console.log(`Home directory: ${homedir()}`);
        break;

      case '--username':
        console.log(`Current system user name: ${userInfo().username}`);
        break;

      case '--architecture':
        console.log(`CPU architecture: ${arch()}`);
        break;

      default:
        throw new Error('Invalid input argument operation');
    }
  } catch (error) {
    console.error(error.message);
  }
};