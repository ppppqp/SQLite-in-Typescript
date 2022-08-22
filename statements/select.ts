import {Row, table, Cursor} from '../data';
import {Statement, PrepareStatementResult, StatementType} from './statements';
export enum SelectExecuteStatementResult{
}
function printRow(row: Row){
    console.log(JSON.stringify(row));
}
export class SelectStatement extends Statement{
    constructor(){
        super(StatementType.SELECT);
        this.prepare();
    }
    prepare(){
        return PrepareStatementResult.SUCCESS;
    }
    execute(){
        const cursor = new Cursor(table);
        cursor.toStart();
        while(!cursor.isEnd){
            printRow(cursor.getValue());
            cursor.advance();
        }
    }

}
