export const TABLE_MAX_PAGES = 10;
export const PAGE_MAX_ROWS = 10;
export interface Row{
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
        return this.numPages === TABLE_MAX_PAGES && this.pages[TABLE_MAX_PAGES-1].isFull();
    }
    addPage(): void{
        this.numPages++;
        this.pages.push(new Page);
    }
    addRow(row: Row){
        if(this.isFull()) throw Error("Table Full");
        if(this.numPages === 0 || this.pages[this.numPages-1].isFull()){
            this.addPage();
        }
        this.pages[this.numPages-1].addRow(row);
    }
}

export const table = new Table();