export const VAlIDATE_INPUTS = function(account){
    const accountArr = Object.entries(account);
    accountArr.forEach(el => {
        if(el[1] !== '') return;
        throw new Error('name');
    })
} 