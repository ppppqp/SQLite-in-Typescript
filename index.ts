const prompt = require('prompt-sync')();

enum Status{
    valid,
    invalid,
}


function prepare_statement(){};
function execute_statement(){};
function repl(): void{
    while(true){
        //REPL: read, execute, print loop
        const input = prompt('db > ');
        // if it is meta statement:
        if(input === null) continue;
        if(input[0] === '.'){
            switch(input){
                case '.exit': {
                    console.log('Exit Successfully. Goodbye!');
                    return;
                }
                default: {
                    console.log('Unrecognized Command');
                    continue;
                }
            }
        }
        prepare_statement();
        execute_statement();
    }
}
repl();