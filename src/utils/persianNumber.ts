export const persianNumber = (num: number | bigint): string => {
    let stringNumber: string;
    
    if(typeof num === "bigint") {
        stringNumber = num.toString();
    } else {
        stringNumber = num.toString();
    }
    
    return Number(stringNumber).toLocaleString("fa-IR");
};
