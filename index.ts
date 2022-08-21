const prompt = require('prompt-sync')({sigint: true});
import fs from 'fs';
import {Blob} from 'node:buffer';
const fsPromises = fs.promises;
import { Statement, PrepareStatementResult} from  './statements/statements';
import {execute_statement, prepare_statement} from './statements/index';
import {execute_meta_command, MetaCommandResult} from './metaCommands'
enum Status{
    valid,
    invalid,
}

async function  repl(){
    while(true){
        //REPL: read, execute, print loop
        const input = prompt('db > ');
        // if it is meta statement:
        if(input === null) continue;
        if(input[0] === '.'){
            await execute_meta_command(input);
            continue;
        }
        const {result, statement} = prepare_statement(input);
        switch(result){
            case PrepareStatementResult.SUCCESS:{
                break;
            }
            case PrepareStatementResult.UNRECOGNIZED:{
                console.log('Unrecognized Command');
                continue;
            }
            case PrepareStatementResult.INVALID:{
                continue;
            }
        }
        if(statement) await execute_statement(statement as Statement);
    }
}
repl();