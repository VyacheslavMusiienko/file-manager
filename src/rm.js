import {join} from 'path';
import { unlink } from 'fs';

export const rm = async (currentPath, pathRemove) => {
  try {
    if (!pathRemove) {
      throw new Error("Invalid input");
    }
    let path = "";
    if (pathRemove.search(/^[a-zA-Z][:]/gm) === 0) {
      path = pathRemove;
    } else {
      path = join(currentPath, pathRemove);
    }
    unlink(path, (error) => {
      if (error) {
        console.log('Failed to delete file:', error);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};