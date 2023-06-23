const inputValue = async (value) => {
  try {
    const valueFilter = value.toString().trim().split(" ");
    const [command , ...args] = valueFilter;

    switch (command) {
      case '.exit':
        process.exit(0);
      case 'up':
        console.log('up');
        break;
      case 'cd':
        console.log('cd');
        break;

      case 'ls':
        const { ls } = await import('./ls.js');
        await ls();
        break;

      case 'cat':
        console.log('cat');
        break;
      case 'add':
        console.log('add');
        break;
      case 'rn':
        console.log('rn');
        break;
      case 'cp':
        console.log('cp');
        break;
      case 'mv':
        console.log('mv');
        break;
      case 'rm':
        console.log('rm');
        break;
      case 'os':
        console.log('os');
        break;
      case 'hash':
        console.log('hash');
        break;
      case 'compress':
        console.log('compress');
        break;
      case 'decompress':
        console.log('decompress');
        break;
      default:
        throw new Error('Invalid value');
    }
  } catch (error) {
    console.error(error.message);
  }
}

export { inputValue };
