const getData = require('./modules/getData');
const setData = require('./modules/setData');
const fs = require('fs/promises')


// Asignation of variables.

const commands = {
    setHistory : 'set history',
    setBudget : 'set budget',
    getCredit : 'get credit',
    getHistory : 'get history',
    getBudget : 'get budget',
    getAllData: 'get allData',
    exit: 'exit'
}



const table = [
    {option: 'change History', command: commands.setHistory},
    {option: 'change Budget', command: commands.setBudget},
    {option: 'see your new credit', command: commands.getCredit},
    {option: 'see your History', command: commands.getHistory},
    {option: 'see the Budget', command: commands.getBudget},
    {option: 'see all the data', command: commands.getAllData},
    {option: 'exit', command: commands.exit}
]


// start the program

const main = async () => {


    while(true){
        console.clear()
        console.table(table)

        const response = await setData.askQuestion('chose an option: ')

        switch (response.trim()){
            case commands.setHistory:
                await setData.setHistory()
                break;
            
            case commands.setBudget:
                await setData.setBudget()
                break;
            
            case commands.getCredit:
                await getData.getCredit()
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

            case commands.exit:
                console.log('Exiting the app. Bye!')
                process.exit(0)
                break;

            default:
                console.log('invalid option, please try again.')
        }
        await setData.askQuestion('\nPress enter to continue...')
    }
}

main();