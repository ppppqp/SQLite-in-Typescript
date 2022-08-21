import {InsertStatement} from './insert'
import {SelectStatement} from './select'

import {BaseExecuteStatementResult, Statement, StatementType, PrepareStatementResult} from './statements'
export const ExecuteStatementResult = {
    ...BaseExecuteStatementResult, 
}

export function prepare_statement(input: string){
    try{
        if(input.substring(0, 6) === 'insert'){
            const statement = new InsertStatement(input);
            return {result: PrepareStatementResult.SUCCESS, statement};
        }else if(input.substring(0, 6) === 'select'){
            const statement = new SelectStatement();
            return {result: PrepareStatementResult.SUCCESS, statement };
        }
        return {result: PrepareStatementResult.UNRECOGNIZED};
    }catch(e: any){
        console.log(e.message);
        return {result: PrepareStatementResult.INVALID};
    }

};


export async function execute_statement(statement: Statement){
    try{
        switch(statement.type){
            case StatementType.INSERT:{
                await statement.execute();
                break;
            }
            case StatementType.SELECT:{
                statement.execute();
                break;
            }
            case StatementType.INVALID:{
                console.log('INVALID!')
                break;
            }
        }
    }catch(e: any){
        console.log(e.message)
    }

};


