const fs = require('fs');

fs.writeFile(
    'sample.txt','Welcome to full stack development workshop 2',(err)=>{
        if(err){
            console.log('Error creating file:',err);
        }
        console.log('File created successfully!');
    }
)
fs.readFile('sample.txt','utf8',(err,data) =>{
if(err){
console.log('Error reading file:',err);
return;
}
console.log('File Content:');
console.log(data);
})


// append




fs.appendFile(
    'sample.txt','\nSemester: 3',(err)=>{
        if(err){
            console.log('Error updating file:',err);
        }else{
        console.log('File updated successfully!');
        }
    }
)

// delete


fs.unlink(
    'sample.txt',(err)=>{
        if(err){
            console.log('Error deleting file:',err);
        }else{
        console.log('\n4. File deleted successfully!');
    }
}

)



