const prompt = require('prompt-sync')();
import { Statement, PrepareStatementResult} from  './statements/statements';
import {execute_statement, prepare_statement} from './statements/index';
import {execute_meta_command, MetaCommandResult} from './metaCommands'
enum Status{
    valid,
    invalid,
}


function repl(): void{
    while(true){
        //REPL: read, execute, print loop
        const input = prompt('db > ');
        // if it is meta statement:
        if(input === null) continue;
        if(input[0] === '.'){
            execute_meta_command(input);
            continue;
        }

        const statement = new Statement();
        switch(prepare_statement(input, statement)){
            case PrepareStatementResult.SUCCESS:{

            }
        }
        execute_statement(statement);
    }
}
repl();