export enum Status {
    REQUESTING = 'REQUESTING',
    ERROR = 'ERROR',
    OK = 'OK'
}

// END = 'REQUESTING', REQUESTING = 'REQUESTING' => END = REQUESTING. Чот ахинея какая то.
export enum Banner {
    END = 'REQUESTING',
    ERROR = 'ERROR',
    REQUESTING = 'REQUESTING',
    NONE = 'NONE'
}

// + зачем два enum с дублированием полей у них REQUESTING, ERROR.
