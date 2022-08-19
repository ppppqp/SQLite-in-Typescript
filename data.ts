const TABLE_MAX_PAGES = 100;
const PAGE_MAX_ROWS = 100;

interface Row{
    id: number,
    username: string,
    email: string,
}
class Page{
    numRows: number;
    rows: Array<Row>;
    constructor(){
        this.numRows = 0;
        this.rows = [];
    }
    isFull(): boolean{
        return this.numRows === PAGE_MAX_ROWS;
    }
    addRow(row: Row){
        this.numRows++; 
        this.rows.push(row);
    }
}


class Table{
    numPages: number;
    pages: Array<Page>;
    constructor(){
        this.numPages = 0;
        this.pages = [];
    }
    isFull(): boolean{
        return this.numPages === TABLE_MAX_PAGES;
    }
    addPage(): void{
        this.numPages++;
        this.pages.push(new Page);
    }
}

export const table = new Table();