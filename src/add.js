import { writeFile } from 'fs/promises';
import { join } from 'path';

export const add = async (newFileName) => {
  try {
    if(!newFileName){
      throw new Error('Invalid input');
    }

    const filePath = join(process.cwd(), newFileName);

    writeFile(filePath, ' ', {flag: 'wx'});
    console.log(`File ${newFileName} create`);
  } catch (error) {
    console.error(error.message);
  }
}