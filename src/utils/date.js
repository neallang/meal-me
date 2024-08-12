export const getFormattedDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1); 
    const day = String(today.getDate()); 

    return `${month}/${day}`;
};

console.log(getFormattedDate()); // Output: M / D or MM / DD