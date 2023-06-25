import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';

export const hash = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("Invalid input");
    }
    const readStream = createReadStream(resolve(filePath));
    const hash = createHash('sha256');
    let data;

    readStream.on('readable', () => {
      while ((data = readStream.read()) !== null) {
        hash.update(data);
      }
    });

    readStream.on('end', () => {
      console.log(`${hash.digest('hex')}`);
    });

    readStream.on('error', (error) => {
      console.log('Error reading file:', error.message);
    });
  } catch (error) {
    console.error(error.message);
  }
};