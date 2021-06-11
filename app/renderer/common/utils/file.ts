import fs, { promises as fsPromiseAPIs } from 'fs';

const ENCODING_UTF8 = 'utf8';

const fileAction = {
    read: (path: string): Promise<string> => {
        return fsPromiseAPIs.readFile(path, { encoding: ENCODING_UTF8 });
    },
    write: (path: string, content: string): Promise<void> => {
        return fsPromiseAPIs.writeFile(path, content, { encoding: ENCODING_UTF8 });
    },
    rename: (oldPath: string, newPath: string): Promise<void> => {
        return fsPromiseAPIs.rename(oldPath, newPath);
    },
    delete: (path: string): Promise<void> => {
        return fsPromiseAPIs.unlink(path);
    },
    hasFile: (path: string): Promise<void> => {
        return fsPromiseAPIs.access(path, fs.constants.F_OK);
    },
    canWrite: (path: string): Promise<void> => {
        return fsPromiseAPIs.access(path, fs.constants.W_OK);
    },
    canRead: (path: string): Promise<void> => {
        return fsPromiseAPIs.access(path, fs.constants.R_OK);
    }
}

export default fileAction;
