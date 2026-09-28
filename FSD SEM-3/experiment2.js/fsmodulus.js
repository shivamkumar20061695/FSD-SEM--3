//  const fs = require('fs');
// fs.writeFileSync('example.txt','This is experiment 2 in FSD workshop','utf8');

// console.log('create file run successfully');

// const data = fs.readFileSync('example.txt', 'utf8');
// console.log('file content is:',data);

// fs.appendFileSync('example.txt','\n This is the new line');
// console.log('Example File is appended');

// fs.unlinkSync('example.txt');
// console.log('Example file is deleted');


// folder create

const fs = require('fs');

fs.mkdirSync('sample folder');

console.log('A new folder is created');

const files = fs.readdirSync('sample folder');
console.log('Folder contents:', files);

fs.renameSync('sample folder', 'renamed_folder');
console.log('Folder renamed successfully');

fs.rmdirSync('renamed_folder');
console.log('Folder deleted successfully');