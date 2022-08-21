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


/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int width;
    int height;
    void traverse(TreeNode *root, int depth){
        if(!root){
            height = max(height, depth);
            return;
        }
        traverse(root->left, depth + 1);
        traverse(root->right, depth + 1);
    }
    void traverse_fill(TreeNode *root, vector<char> &path, vector<vector<string>> & res){
        if(!root) return;
        int rowNum = path.size();
        int left = 0;
        int right = width;
        for(int i = 0; i < path.size(); i++){
            if(path[i] == 'l'){
                right = (right+left)/2; 
            }else{
                left = (right+left)/2;
            }
        }
        int colNum = left + (right-left)/2;
        res[rowNum][colNum] = to_string(root->val);
        path.push_back('l');
        traverse_fill(root->left, path, res);
        path.pop_back();
        path.push_back('r');
        traverse_fill(root->right, path, res);
        path.pop_back();
        return;
    }
    vector<vector<string>> printTree(TreeNode* root) {
        width = 0;
        height = 0;
        traverse(root, 0);
        width = pow(2, height) - 1;
        vector<vector<string> >res(height, vector<string>(width));
        vector<char> path;
        traverse_fill(root, path, res);
        return res;
    }
};