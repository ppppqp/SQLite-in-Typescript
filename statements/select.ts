import {Row, table} from '../data';
import {Statement, PrepareStatementResult, StatementType} from './statements';
export enum SelectExecuteStatementResult{
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
        // table.pages.forEach((p)=>{
        //     p.rows.forEach((row)=>{
        //         console.log(`( ${row.id}, ${row.username}, ${row.email})`);
        //     })
        // });
    }

}
