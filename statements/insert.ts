import {Row, table} from '../data';
import {Statement, StatementType, PrepareStatementResult} from './statements'
import { debugWrapper } from '../utils/debugWrapper';
export enum InsertExecuteStatementResult{
    TABLE_FULL = 'TABLE_FULL',
}
export class InsertStatement extends Statement{
    rowToInsert:  Row;
    constructor(input: string){
        super(StatementType.INSERT);
        this.rowToInsert = new Row(-1, 'invalid', 'invalid');
        this.prepare(input);
    };
    prepare(input: string){
        this.type = StatementType.INSERT;
        const args = input.trim().split(/\s+/);
        if(args.length !== 4) throw Error('Syntax Error!');
        const row = new Row(Number(args[1]), args[2], args[3]);
        this.rowToInsert = row;
        return PrepareStatementResult.SUCCESS;
    }
    execute(){
        if(table.isFull()){
            throw Error("Table Full!");
        }
        debugWrapper(()=>console.log('Inserted', this.rowToInsert))
        table.addRow(this.rowToInsert);
    }
}
