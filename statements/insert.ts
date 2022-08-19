const {Row, table, } = require('../data.ts');
const {Statement} = require('./statements.ts')

export enum InsertExecuteStatementResult{
    TABLE_FULL = 'TABLE_FULL',
}
export class InsertStatement extends Statement{
    rowToInsert: typeof Row;
    constructor(row: typeof Row){
        super();
        this.rowToInsert = row
    }
}

export function execute_insert(statement: InsertStatement){
    if(table.isFull()){
        return InsertExecuteStatementResult.TABLE_FULL;
    }
}