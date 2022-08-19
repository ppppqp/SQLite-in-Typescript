import {execute_insert, InsertExecuteStatementResult} from './insert'

import {BaseExecuteStatementResult, Statement, StatementType, PrepareStatementResult} from './statements'
export const ExecuteStatementResult = {
    ...BaseExecuteStatementResult, 
    ...InsertExecuteStatementResult,
}

export function prepare_statement(input: string, statement: Statement): PrepareStatementResult{
    if(input.substring(0, 6) === 'insert'){
        statement.type = StatementType.INSERT;
        return PrepareStatementResult.SUCCESS;
    }else if(input.substring(0, 6) === 'select'){
        statement.type = StatementType.SELECT;
        return PrepareStatementResult.SUCCESS;
    }
    return PrepareStatementResult.UNRECOGNIZED;
};


export function execute_statement(statement: Statement){
    switch(statement.type){
        case StatementType.INSERT:{
            console.log('INSERT!');
            break;
        }
        case StatementType.SELECT:{
            console.log('SELECT!');
            break;
        }
        case StatementType.INVALID:{
            console.log('INVALID!')
        }
    }
};


