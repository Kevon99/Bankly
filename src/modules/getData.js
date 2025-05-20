const fs = require('fs/promises');
const path = require('./config');



const getCredit = async () =>{

    try{
        // Generar el objeto con la data
        const readData = await fs.readFile(path.jsonPath, 'utf-8')
        let data = JSON.parse(readData)

        // Asignacion de variables
        const budgetValue = Number(data.budget)
        const historyValue = Number(data.history)

        if(isNaN(budgetValue) || isNaN(historyValue)){
            throw new Error("The archive (data.json) have invalid values")
        }

        // Asignacion de variables y calculos
        const budgetPersent = budgetValue / 100

        const bonusDefault = budgetPersent * 20

        let bonus = ((historyValue * 5) * budgetPersent) + bonusDefault

        if(bonus >= budgetValue / 2){
            bonus = budgetValue / 2
        }

        // reescribir el archivo json
        data.credit = bonus

        await fs.writeFile(path.jsonPath, JSON.stringify(data, null, 2))

        console.log('This is your credit: ', data.credit)


    }catch(error){
        console.error("There was an error in the function getCredit: ", error.message)
    }

}


const getHistory = async () => {
    try{
        const readData = await fs.readFile(path.jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        let history = data.history
        if(isNaN(history)){
            throw new Error("there was an error in t he archive data.json in the value of history")
        }
        console.log(`Your history has a total of: ${history}`)
    }catch(error){
        console.error("there was an error in the function getHistory: ", error.message)
    }
}


const getBudget = async () => {
    try{
        const readData = await fs.readFile(path.jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const budget = data.budget
        if(isNaN(budget)){
            throw new Error('there was an error in the archive data.json, with the budget values')
        }
        console.log(`the budget of the bank is : ${budget}`)
    }catch(error){
        console.error("There was an error in the function getBudget: " , error.message)
    }
}

const getAllData = async () => {
    try{
        const readData = await fs.readFile(path.jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const table = [
            {data: 'history', value: data.history},
            {data: 'budget', value: data.budget},
            {data: 'credit', value: data.credit}
        ]
        console.table(table)
    }catch(error){
        console.error('there was an error on printing the table: ', error.message)
    }
}



module.exports = {
    getCredit,
    getHistory,
    getBudget,
    getAllData
}