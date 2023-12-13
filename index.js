import ora from "ora";
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { error } from "console";

/* MVP: organizing desktop screenshots from CLI */

/* adding functions for
- installation messages, hi and how-to
- terminal commands
- moving files to a folder
- creating a folder
- ignoring shortcuts or any already created folders
- arranging them to the left
- undo everything
- functions: camelCase, variable: lowercase, why? I went crazy.
*/

const desktoppath = "";
/* get this from users env somehow*/

organize("Screenshot","Screenshots");
organize("IMG","Picture-diary");
// findFile("Screenshot");

function matchFilenameToKeyword(filename, keyword){
    const regex = new RegExp(`^${keyword}`, 'i');
    return regex.test(path.basename(filename, path.extname(filename)));
}

async function findFile(keyword){
 try{
    const files = await fs.promises.readdir(desktoppath);
    console.log(`Found ${files.length} ${keyword}s on the desktop`);

    for (const file of files){
        const filepath = path.join(desktoppath, file);
        const stats = await fs.promises.stat(filepath);

        if(stats.isFile() && matchFilenameToKeyword(file, keyword)){
            console.log(file);
            // console.log("🤍 It's a file.");
        }
    }
 }
 catch(error){
    console.log(`✂️  oopsies! there is an ${chalk.magentaBright('ERROR')}`);
    console.error(error);
 }
}

/*[TODO: needs fixing, this is too much] */
async function doesFolderExists(foldername){
    try{
        const files = await fs.promises.readdir(desktoppath);    
        for (const file of files){
            const folderpath = path.join(desktoppath, foldername);
            const stats = await fs.promises.stat(folderpath);
            if(stats.isDirectory())
                return true;
         }
         return false;
    }
     catch(error){
        console.log(`✂️  my my! there is an ${chalk.magentaBright('ERROR')}`);
        console.error(error);
     }
}


/* if the keyword is found anywhere in the name
it will move to foldername */
function organize(keyword, destinationfolder){
    if (!folderExists(destinationfolder)) {
        // createFolder(destinationfolder);
        console.log(`Folder created: ${destinationfolder}`);
      } else {
        console.log(`Folder already exists: ${destinationfolder}`);
    }
    // moveFile(findFile(keyword), destinationfolder);
}

function moveFile(filename, destinationfolder){
  console.log("yep yep yep files will be moved.")
}

function createFolder(foldername){
    /* return if the folder exists */
    /* else create it on the Desktop */
    console.log(" this will create a freakin folder");
}