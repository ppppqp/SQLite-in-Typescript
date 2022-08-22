export const TABLE_MAX_PAGES = 10;
export const PAGE_MAX_ROWS = 10;
const ROW_SIZE = 100; // this is not a coincidence!
const PAGE_SIZE = ROW_SIZE * PAGE_MAX_ROWS + 200; // 200 characters reserved for deliminators of JSON object. Pretty inefficient.
const ROW_COUNT_SIZE = 10;// space allocated to store row count
import fs from 'fs';
const fsPromises = fs.promises;
import { debugWrapper } from './utils/debugWrapper';
export const SCHEMA_SIZE = {
    ID_SIZE: 1, // 8 bytes for a number
    USERNAME_SIZE: 30, // 2 bytes per char for string: 15 characters for longest username, 30 bytes in total
    EMAIL_SIZE: 30 //   2 bytes per char for string: 15 characters for longest email, 30 bytes in total
}
export class Row{
    id: string;
    username: string;
    email: string;
    constructor(id?: number, username?: string, email?: string){
        if(id === undefined) id = -1;
        if(username === undefined) username = '';
        if(email === undefined) email = '';

        this.id = String(id).padStart(5, '0');
        if(username.length > SCHEMA_SIZE.USERNAME_SIZE) throw Error('Username too long!');
        if(email.length > SCHEMA_SIZE.EMAIL_SIZE) throw Error('Email too long!');

        this.username = username.padEnd(SCHEMA_SIZE.USERNAME_SIZE); // pad to the schema length
        this.email = email.padEnd(SCHEMA_SIZE.EMAIL_SIZE);
    }
    copyFrom(row:Row){
        this.id = row.id;
        this.username = row.username;
        this.email = row.email;
    }
}
class Page{
    numRows: number;
    rows: Array<Row>;
    constructor(pageData?: any){
        this.numRows = 0;
        this.rows = [];
        if(pageData){
            this.numRows = pageData.numRows;
            this.rows = pageData.rows;
        }
    } 
    isFull(): boolean{
        return this.numRows === PAGE_MAX_ROWS;
    }
    addRow(row: Row){
        this.numRows++; 
        this.rows.push(row);
    }
}
class Pager{
    pages: Record<number, Page>;
    fileName: string;
    fd: number;
    fileLength: number;
    numPages: number;
    constructor (fileName: string){
        this.fileName = fileName;
        if(fs.existsSync(fileName)){
            // if the file exists, get the file size
            const stats = fs.statSync(fileName);
            this.fileLength = stats.size;
        }else{
            // otherwise the file size should be 0
            this.fileLength = 0;
        }
        this.fd = fs.openSync(fileName, 'r+');
        this.pages = {}; // empty cache at the start
        this.numPages = Math.ceil(this.fileLength / PAGE_SIZE);
    };
    getNumRows(){
        const buffer = Buffer.alloc(ROW_COUNT_SIZE);
        fs.readSync(this.fd, buffer, 0, buffer.length, 0);
        return Number(buffer.toString().trim());
    }
    updateNumRows(rowNum: number){
        const buffer = Buffer.from(String(rowNum).padEnd(ROW_COUNT_SIZE-1) + '\n');
        fs.writeSync(this.fd, buffer, 0, buffer.length, 0);
    }
    getPage(pageNum: number){
        if(pageNum > TABLE_MAX_PAGES || pageNum < 0){
            throw Error(`page number ${pageNum} out of bounds"`);
        }
        if(pageNum in this.pages){
            // exists in memory cache
            return this.pages[pageNum];
        }else{
            //cache miss, read from the file
            const buffer = Buffer.alloc(PAGE_SIZE);
            console.log('pageNum',pageNum);
            fs.readSync(this.fd, buffer, 0, buffer.length, ROW_COUNT_SIZE + pageNum * PAGE_SIZE);
            // debugWrapper(()=>console.log("page read:", buffer.toString()));
            const pageData = buffer.toString();
            let page: any;
            try{
                page = new Page(JSON.parse(pageData));
            }catch(e){
                page = new Page;
            }
            debugWrapper(()=>console.log('page cache brought:', page))
            this.pages[pageNum] = page;
            return page;
            //
        }
    }
    flush(){
        debugWrapper(()=>console.log("PAGE CACHE: ",this.pages));
        const pageNumList = Object.keys(this.pages);
        for(let pageNum of pageNumList){
            const buffer = Buffer.from(JSON.stringify(this.pages[Number(pageNum)]).padEnd(PAGE_SIZE-1)+'\n');
            console.log(buffer.toString());
            fs.writeSync(this.fd, buffer, 0, buffer.length, ROW_COUNT_SIZE + Number(pageNum) * PAGE_SIZE);
        }
    }
    close(){
        
        this.flush();
        fs.closeSync(this.fd);
    }
}

export class Cursor{
    rowNum!: number;
    isEnd!: boolean;
    table!: Table;
    constructor(table:Table){
        this.table = table;
        this.toStart();
    }
    toStart(){
        this.rowNum = 0;
        this.isEnd = (table.numRows == 0);
    }
    toEnd(){
        this.rowNum = table.numRows;
        this.isEnd = true;
    }
    getValue(){
        const page = table.pager.getPage(Math.floor(this.rowNum/PAGE_MAX_ROWS));
        if(this.isEnd){
            // create a new row
            console.log(page);
            page.addRow(new Row());
        }
        return page.rows[this.rowNum%PAGE_MAX_ROWS];
    }
    advance(){
        this.rowNum++;
        if(this.rowNum == this.table.numRows) this.isEnd = true;
        if(this.rowNum > this.table.numRows) throw Error('Cursor out of boundary!');
    }
}
class Table{
    numPages: number;
    numRows: number;
    pager: Pager;
    constructor(fileName: string){
        this.pager = new Pager(fileName);
        this.numRows = this.pager.getNumRows();
        console.log('numRows here', this.numRows);

        this.numPages = 0;
    }
    isFull(): boolean{
        return this.numRows === PAGE_MAX_ROWS * TABLE_MAX_PAGES;
    }

    addRow(row: Row, cursor: Cursor){
        if(this.isFull()) throw Error("Table Full");
        // BUGGY: should assume insert, not append
        const rowToAdd = cursor.getValue();
        rowToAdd.copyFrom(row);
        this.numRows ++;
    }
    
    close(){
        this.pager.updateNumRows(this.numRows);
        this.pager.close();
    }
}

export const table = new Table('./data.db');