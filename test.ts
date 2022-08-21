// import {spawn} from 'child_process';

// const dbProcess = spawn("yarn", ['ts-node', 'index.ts']); // spawn my database process
// // dbProcess.stdout.pipe(process.stdout);
// dbProcess.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
// });

// dbProcess.send('')

// dbProcess.stdin.cork();
// dbProcess.stdin.write('.exit\n');
// dbProcess.stdin.uncork();
// dbProcess.stdin.cork();
// dbProcess.stdin.write('select\n');
// dbProcess.stdin.uncork();
// dbProcess.stdin.cork();
// dbProcess.stdin.write('select\n');
// dbProcess.stdin.uncork();
// var spawn = require('child_process').spawn,
//     child = spawn('yarn', ['ts-node', 'index.ts'],{
//         stdio: 'pipe'
//       });

// child.stdin.setEncoding('utf-8');
// child.stdout.pipe(process.stdout);

// child.stdin.write(".exit\n");

// child.stdin.end(); /// this call seems necessary, at least with plain node.js executable


const fs = require('fs');
const fsPromises = fs.promises;
  
  
  
// Using the async function to 
// ReadFile using filehandle
async function doRead() {
    // Using the filehandle method
    const buffer = Buffer.alloc(1024);
    const filehandle = await fsPromises
                .open('index.ts', 'r+');
    console.log(filehandle)
    // Calling the filehandle.read() method
    await filehandle.read(buffer,
            0, buffer.length, 0);
    console.log(buffer.toString())
}
  
doRead().catch(console.error);