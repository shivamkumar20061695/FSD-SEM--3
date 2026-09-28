const fs = require("fs").promises;

async function writeFile(){
    try {
        await fs.writeFile("promises.txt", "Hello Students!");
        console.log("File created and data written successfully.");
    }catch(error){
        console.log("Error:",error);
    }
}
writeFile();

// read file

async function readFile(){
    try {
        const data=await fs.readFile("promises.txt","utf8");
        console.log("File content:");
         console.log("data");

    }catch(error){
        console.log("Error:",error);
    }
}
readFile();

// rename


async function renameFile(){
    try {
        await fs.rename("promises.txt","promises_new.txt");
        console.log("File renamed successfully:");
        

    }catch(error){
        console.log("Error:",error);
    }
}
renameFile();