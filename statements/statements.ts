/* enums */
export enum StatementType{
    SELECT,
    INSERT,
    INVALID,
}

export enum PrepareStatementResult{
    SUCCESS,
    UNRECOGNIZED
}


export enum BaseExecuteStatementResult{
    SUCCESS = 'SUCCESS',
    UNRECOGNIZED = 'UNRECOGNIZED',
}

/* classes */
export class Statement{
    type: StatementType;
    constructor(){
        this.type = StatementType.INVALID;
    }
}




