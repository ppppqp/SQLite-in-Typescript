import {Row, table} from '../data';
import {Statement, StatementType, PrepareStatementResult} from './statements'
export enum InsertExecuteStatementResult{
    TABLE_FULL = 'TABLE_FULL',
}
export class InsertStatement extends Statement{
    rowToInsert:  Row;
    constructor(input: string){
        super(StatementType.INSERT);
        this.rowToInsert = {id: -1, username: 'invalid', email: 'invalid'};
        this.prepare(input);
    };
    prepare(input: string){
        this.type = StatementType.INSERT;
        const args = input.trim().split(/\s+/);
        if(args.length !== 4) throw Error('Syntax Error!');
        const row: Row = {
            id: Number(args[1]),
            username: args[2],
            email: args[3],
        }
        this.rowToInsert = row;
        return PrepareStatementResult.SUCCESS;
    }
    execute(){
        if(table.isFull()){
            throw Error("Table Full!");
        }
        console.log('Inserted', this.rowToInsert);
        table.addRow(this.rowToInsert);
    }
}
