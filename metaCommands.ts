
import { table } from "./data";
export enum MetaCommandResult{
    SUCCESS,
    UNRECOGNIZED
}





export function execute_meta_command(input: string){
    switch(input){
        case '.exit': {
            table.close();
            console.log('Exit Successfully. Goodbye!');
            process.exit(MetaCommandResult.SUCCESS);
        }
        default: {
            console.log('Unrecognized Command');
            return MetaCommandResult.UNRECOGNIZED;
        }
    }
}
