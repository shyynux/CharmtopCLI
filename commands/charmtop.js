import ora from "ora";
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// MVP: just organize screenshots

const currentdir = process.cwd();

function initialize() {
    const spinner = ora(`CharmING your ${chalk.magentaBright('Desktop')}`).start();
    organize("Screenshot", "Screenshots");
    spinner.succeed(`✨ Charmed ✨ your ${chalk.magentaBright('Desktop')}`)
    console.log(`thx for using ${chalk.magentaBright('CharmTop 💖')} :)`)
}

/* the core function which will 💖 charm 💖 the desktop */
function organize(keyword, destinationfolder){
    if (!doesFolderExists(destinationfolder)) {
        createFolder(destinationfolder);
    }
    findAndMoveFiles(keyword, destinationfolder);
}

/* Checks if the folder exists or not */
function doesFolderExists(foldername) {
    const folderpath = path.join(currentdir, foldername);
    try {
      if (fs.existsSync(folderpath)) {
          return true;
      }
      else{
          return false;
      }
    } catch (error) {
      console.log(`:( sadly there is an ${chalk.magentaBright('ERROR')}`);
      console.error(error);
    }
}

/* Creates a folder on the desktop */
function createFolder(foldername){
    const folderpath = path.join(currentdir, foldername);
    fs.mkdirSync(folderpath);
}

/* matches filename to existing files */
function matchFilenameToKeyword(filename, keyword){
    const regex = new RegExp(`^${keyword}`, 'i');
    return regex.test(path.basename(filename, path.extname(filename)));
}

/* finding all the files on the desktop and moving them asynchronously */
async function findAndMoveFiles(keyword, destinationfolder){
    try{
        const files = await fs.promises.readdir(currentdir);
    
        for (const file of files){
            const filepath = path.join(currentdir, file);
            const stats = await fs.promises.stat(filepath);
    
            if(stats.isFile() && matchFilenameToKeyword(file, keyword)){
                moveFile(file, destinationfolder);
            }
        }
     }
     catch(error){
        console.log(`✂️  oopsies! there is an ${chalk.magentaBright('ERROR')}`);
        console.error(error);
     }
}

/* moving a single file from A to B location */
async function moveFile(filename, destinationfolder) {
    const oldpath = path.join(currentdir, filename);
    const blahhhh = path.join(currentdir, destinationfolder)
    const newpath = path.join(blahhhh, filename);
  
    // console.log(`Moving file "${filename}" from "${oldpath}" to "${newpath}"...`);
  
    try {
      await fs.promises.rename(oldpath, newpath);
    //   console.log(`✅ File "${filename}" successfully moved!`);
    } catch (error) {
    //   console.error(`❌ Error moving file: ${error.message}`);
    }
  }
  

export default initialize

