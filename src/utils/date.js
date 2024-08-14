export const getFormattedDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1); 
    const day = String(today.getDate()); 

    return `${month}/${day}`;
}; // Output: M / D or MM / DD