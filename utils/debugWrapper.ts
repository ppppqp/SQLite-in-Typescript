export const debugWrapper = (f: Function)=>{
    f();
    console.log("==================================");
}