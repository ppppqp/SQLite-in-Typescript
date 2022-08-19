
export enum MetaCommandResult{
    SUCCESS,
    UNRECOGNIZED
}





export function execute_meta_command(input: string): MetaCommandResult{
    switch(input){
        case '.exit': {
            console.log('Exit Successfully. Goodbye!');
            process.exit(MetaCommandResult.SUCCESS);
        }
        default: {
            console.log('Unrecognized Command');
            return MetaCommandResult.UNRECOGNIZED;
        }
    }
}