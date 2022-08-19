import{Row, table, TABLE_MAX_PAGES, PAGE_MAX_ROWS} from '../../data'
describe("Test Suite: data", ()=>{
    describe("table", ()=>{
        test("table initialize", ()=>{
            console.log(table)
            expect(table.numPages).toBe(0);
            expect(table.pages).toEqual([]);
        })
        test("table isFull", ()=>{
            expect(table.isFull()).toBe(false);
            for(let i = 0; i < TABLE_MAX_PAGES; i++){
                for(let j = 0; j < PAGE_MAX_ROWS; j++){
                    table.addRow({id: -1, username: 'invalid', email: 'invalid'});
                }
            }
            expect(table.isFull()).toBe(true);
            try{
                table.addRow({id: -1, username: 'invalid', email: 'invalid'});
            }catch(e){
                expect(e.message).toBe("Table Full")
            }
        })
        test("table size", ()=>{
            expect(table.numPages).toBe(TABLE_MAX_PAGES);
            expect(table.pages[table.numPages-1].numRows).toBe(PAGE_MAX_ROWS);
        })
    })
})