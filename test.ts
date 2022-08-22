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

  
  


