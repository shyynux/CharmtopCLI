/* flow
- user enters 'charmtop' on the terminal
- [optional] getting path from user, ideally we will do it
- when the user will enter charmtop
    - a spinner will run
    - moving screenshots to screenshots
    - moving images to pictures
    - moving text files to notes
    - moving screen recordings to screen-recordings
    - moving videos to videos
    - Do you want to know what files you have not opened in 180 days? (y/n)
        - [y], list them
        - Shall I delete these? (y/n)
        - y: delete
        - n: okay then, ALL DONE NOW!
    - [n] YAY! ALL DONE!
    - thx for using CharmTop :)
    - Check out your charmed desktop now!
- */

import ora from "ora";
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

/* MVP: organizing desktop screenshots from CLI */

/* adding functions for
- installation messages, hi and how-to
- terminal commands
- moving files to a folder
- creating a folder
- ignoring shortcuts or any already created folders
- arranging them to the left
- undo everything (this is tricky!)
- functions: camelCase, variable: lowercase, why? I went crazy.
*/

const testpath = "/Users/jayshree/Documents/open-source/sample";
const desktoppath = "/Users/jayshree/Desktop/";
/* get this from users env somehow*/

organize("Screenshot","Screenshots");
organize("IMG","Picture-diary");

function organize(keyword, destinationfolder){
    if (doesFolderExists(destinationfolder)) {
        console.log(`Organizing in: ${destinationfolder}`);
      } else {
        createFolder(destinationfolder);
        console.log(`Creating a folder named: ${destinationfolder}`);
    }

    findAndMoveFiles(keyword, destinationfolder);
}

async function terminalSpinner(){
    
}

async function findAndMoveFiles(keyword, destinationfolder){
    try{
        const files = await fs.promises.readdir(testpath);
        console.log(`Found ${files.length} which are ${keyword}s on the desktop`);
    
        for (const file of files){
            const filepath = path.join(testpath, file);
            const stats = await fs.promises.stat(filepath);
    
            if(stats.isFile() && matchFilenameToKeyword(file, keyword)){
                // console.log("🤍 let's move it -> ",file);
                moveFile(file, destinationfolder);
            }
        }
     }
     catch(error){
        console.log(`✂️  oopsies! there is an ${chalk.magentaBright('ERROR')}`);
        console.error(error);
     }
}

function matchFilenameToKeyword(filename, keyword){
    const regex = new RegExp(`^${keyword}`, 'i');
    return regex.test(path.basename(filename, path.extname(filename)));
}

async function findFile(keyword){
 try{
    const files = await fs.promises.readdir(testpath);
    console.log(`Found ${files.length} ${keyword}s on the desktop`);

    for (const file of files){
        const filepath = path.join(testpath, file);
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

function doesFolderExists(foldername) {
      const folderpath = path.join(testpath, foldername);
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



function moveFile(filename, destinationfolder){
    const oldpath = path.join(testpath, filename);
    const blahhhh = path.join(testpath, destinationfolder)
    const newpath = path.join(blahhhh, filename);

    fs.rename(oldpath, newpath, function (err) {
        if (err) throw err
        console.log('Successfully moved!')
    })
}

function createFolder(foldername){
    const folderpath = path.join(testpath, foldername);
    fs.mkdirSync(folderpath);
    console.log(" this will create a freakin folder in the", testpath);
}