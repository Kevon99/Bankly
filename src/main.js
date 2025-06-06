const getData = require('./modules/getData');
const setData = require('./modules/setData');
const {setLevel} = require('./modules/level')


// Asignation of variables.

const commands = {
    setHistory : 'set history',
    setBudget : 'set budget',
    setObjetive : 'set objetive',
    getObjetive : 'get objetive',
    getHistory : 'get history',
    getBudget : 'get budget',
    getAllData: 'get allData',
    getDebts: 'get debts',
    setDebts: 'set debts',
    getWishlist: 'get wishList',
    setWishList: 'add wishList',
    setTaxes: 'set taxes',
    getTaxes: 'get taxes',
    setTaxes: 'set taxes',
    getTaxes: 'get taxes',
    exit: 'exit'

}


const table = [
    {option: 'set your taxes :(', command : commands.setTaxes},
    {option: 'change History', command: commands.setHistory},
    {option: 'change Budget', command: commands.setBudget},
    {option: 'change your debts value', command: commands.setDebts},
    {option: 'add a object to your wishlist', command: commands.setWishList},
    {option: 'set a new objetive', command: commands.setObjetive},
    {option: 'see your taxes', command: commands.getTaxes},
    {option: 'see your objetives', command: commands.setObjetive},
    {option: 'see your History', command: commands.getHistory},
    {option: 'see the Budget', command: commands.getBudget},
    {option: 'see the debts', command: commands.getDebts},    
    {option: 'see all the data', command: commands.getAllData},
    {option: 'see your wishlist', command: commands.getWishlist},
    {option: 'set a new object to your wish list', command: commands.setWishList},
    {option: 'exit', command: commands.exit}
]








// start the program

const main = async () => {
    try{
        while(true){
            console.clear()
            await setLevel()        
            console.table(table)
            

            const response = await setData.askQuestion('chose an option: ')

            switch (response.trim()){
                case commands.setHistory:
                    await setData.setHistory()
                    break;

                case commands.setTaxes:
                    await setData.setTaxes()
                    break;
                
                case commands.setBudget:
                    await setData.setBudget()
                    break;

                case commands.getHistory:
                    await getData.getHistory()
                    break;

                case commands.getBudget:
                    await getData.getBudget()
                    break;

                case commands.getAllData:
                    await getData.getAllData()
                    break;

                case commands.getDebts:
                    await getData.getDebts()
                    break;

                case commands.setDebts:
                    await setData.setDebts()
                    break;

                case commands.getTaxes:
                    await getData.getTaxes()
                    break;

                case commands.setWishList:
                    await setData.setWishList()
                    break;
                
                case commands.getWishlist:
                    await getData.getWishList()
                    break;

                case commands.setWishList:
                    await setData.setWishList()
                    break;

                case commands.exit:
                    console.log('Exiting the app. Bye!')
                    process.exit(0)
                    break;

                default:
                    console.log('invalid option, please try again.')
            }
            await setData.askQuestion('\nPress enter to continue...')
        }

    }catch(error){
        console.error('error executing program', error.message)
    }


}

main();