import { readdir } from 'fs/promises';

export const ls = async () => {
  class Structure {
    constructor(name, type) {
      this.Name = name;
      this.Type = type;
    }
  }

  try {
    const directories = await readdir(process.cwd(), { withFileTypes: true });
    const filterDir = directories.sort(a => a.isFile() ? 1 : -1).map(el => new Structure(el.name, el.isFile() ? 'file' : 'directory'));
    console.table(filterDir);
  } catch (error) {
    console.error(error.message);
  }
};
