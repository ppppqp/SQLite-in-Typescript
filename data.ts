export const TABLE_MAX_PAGES = 10;
export const PAGE_MAX_ROWS = 10;
const ROW_SIZE = 100; // this is not a coincidence!
const PAGE_SIZE = ROW_SIZE * PAGE_MAX_ROWS;

import { strict as assert } from 'node:assert';
import fs from 'fs';
const fsPromises = fs.promises;
export const SCHEMA_SIZE = {
    ID_SIZE: 1, // 8 bytes for a number
    USERNAME_SIZE: 30, // 2 bytes per char for string: 15 characters for longest username, 30 bytes in total
    EMAIL_SIZE: 30 //   2 bytes per char for string: 15 characters for longest email, 30 bytes in total
}
export class Row{
    id: string;
    username: string;
    email: string;
    constructor(id: number, username: string, email: string){
        this.id = String(id).padStart(5, '0');
        if(username.length > SCHEMA_SIZE.USERNAME_SIZE) throw Error('Username too long!');
        if(email.length > SCHEMA_SIZE.EMAIL_SIZE) throw Error('Email too long!');

        this.username = username.padEnd(SCHEMA_SIZE.USERNAME_SIZE); // pad to the schema length
        this.email = email.padEnd(SCHEMA_SIZE.EMAIL_SIZE);
    }
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
        console.log('add row')
        this.rows.push(row);
    }
}
class Pager{
    pages: Record<number, Page>;
    fileName: string;
    fileHandle: any;//fs.promises.FileHandle | undefined;
    fileLength: number;
    numPages: number;
    connected: boolean;
    constructor (fileName: string){
        this.fileName = fileName;
        this.connected = false;
        if(fs.existsSync(fileName)){
            // if the file exists, get the file size
            const stats = fs.statSync(fileName);
            this.fileLength = stats.size;
        }else{
            // otherwise the file size should be 0
            this.fileLength = 0;
        }
        this.pages = {}; // empty cache at the start
        this.numPages = Math.ceil(this.fileLength / PAGE_SIZE);
    };
    async doRead() {
        // Using the filehandle method
        const buffer = Buffer.alloc(1024);
        const filehandle = await fsPromises
                    .open('index.ts', 'r+');
        console.log(filehandle)
        // Calling the filehandle.read() method
        await filehandle.read(buffer,
                0, buffer.length, 0);
        console.log(buffer.toString())
    };
    async connect(){
        // to synchornously initialize file handler
        // open the db file in read/write mode. If it doesn't exist, create the file with user r/w permission.
        try{
            this.fileHandle = await fsPromises.open('data.db', 'r+');
            console.log('Connected!');
        }catch(e){
            console.log(e)
        } //fs.constants.O_RDWR|fs.constants.O_CREAT, fs.constants.S_IWUSR|fs.constants.S_IRUSR);
    }
    async getPage(pageNum: number){
        if(!this.connected){
            await this.connect();
            this.connected = true;
        }
        if(pageNum > TABLE_MAX_PAGES || pageNum < 0){
            throw Error("page number out of bounds");
        }
        if(pageNum in this.pages){
            // exists in memory cache
            return this.pages[pageNum];
        }else{
            //cache miss, read from the file
            const buffer = Buffer.alloc(ROW_SIZE);
            await this.fileHandle?.read(buffer, 0, buffer.length, pageNum * PAGE_SIZE);
            console.log(buffer.toString());
            const page = new Page;

            this.pages[pageNum] = page;
            console.log('here', this.pages);
            return page;
        }
    }
    async flush(){
        console.log(this.pages);
        const pageNumList = Object.keys(this.pages);
        for(let pageNum of pageNumList){
            const buffer = Buffer.from(JSON.stringify(this.pages[Number(pageNum)]));
            console.log(buffer.toString())
            await this.fileHandle?.write(buffer, 0, buffer.length, Number(pageNum) * PAGE_SIZE);
        }
    }
    close(){
        this.flush();
        this.fileHandle?.close();
    }
}

class Table{
    numPages: number;
    numRows: number;
    pager: Pager;
    constructor(fileName: string){
        this.pager = new Pager(fileName);
        this.numRows = this.pager.fileLength / ROW_SIZE;
        this.numPages = 0;
    }
    isFull(): boolean{
        return this.numRows === PAGE_MAX_ROWS * TABLE_MAX_PAGES;
    }

    async addRow(row: Row){
        if(this.isFull()) throw Error("Table Full");
        console.log('enter add row')
        // append to the last row at this moment
        const page = await this.pager.getPage(this.pager.numPages);
        page.addRow(row);
        console.log(page)
    }
    
    close(){
        this.pager.close();
    }
}

export const table = new Table('./data.db');