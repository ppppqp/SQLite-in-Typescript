/* enums */
export enum StatementType{
    SELECT,
    INSERT,
    INVALID,
}

export enum PrepareStatementResult{
    SUCCESS,
    UNRECOGNIZED,
    INVALID
}


export enum BaseExecuteStatementResult{
    SUCCESS = 'SUCCESS',
    UNRECOGNIZED = 'UNRECOGNIZED',
}

/* classes */
export class Statement{
    type: StatementType;
    constructor(type?: StatementType, statement? : Statement){
        if(type !== undefined){
            this.type = type;
        }else{
            this.type = (statement?.type)? statement.type :StatementType.INVALID;
        }
    };
    prepare(_: string){
        return PrepareStatementResult.SUCCESS
    }
    execute(){}
}




