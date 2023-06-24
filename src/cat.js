import { createReadStream } from 'fs';
import { resolve } from 'path';

export const cat = async (filePath) => {
  try {
    if(!filePath){
      throw new Error('Invalid input path in cat')
    }

    let stream = createReadStream(resolve(filePath));
    stream.on('data', (chunk) => console.log(chunk.toString()));
    stream.on('error', () => console.log('Operation failed'));
  } catch (error) {
    console.error(error.message);
  }
};