const fs = require('fs/promises');
const {jsonPath,erroMessage} = require('./config');


const getCredit = async () =>{

    try{
        // Generar el objeto con la data
        const readData = await fs.readFile(jsonPath, 'utf-8')
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


    }catch(error){
        erroMessage("getCredit",error)
    }

}


const getHistory = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        let history = data.history
        if(isNaN(history)){
            throw new Error("there was an error in t he archive data.json in the value of history")
        }
        console.log(`Your history has a total of: ${history}`)
        getCredit()
    }catch(error){
        erroMessage('getHistory',error)
    }
}


const getBudget = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const budget = data.budget
        if(isNaN(budget)){
            throw new Error('there was an error in the archive data.json, with the budget values')
        }
        console.log(`the budget of the bank is : ${budget}`)
        getCredit()
    }catch(error){
        erroMessage('getBudget',error)
    }
}

const getAllData = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const table = [
            {data: 'history', value: data.history},
            {data: 'budget', value: data.budget},
            {data: 'credit', value: data.credit},
            {data: 'debts', value: data.debts}

        ]
        console.table(table)

        getCredit()
    }catch(error){
        erroMessage('getAllData',error)
    }
}


const getDebts = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const debts = data.debts
        if(isNaN(debts)){
            throw new Error('there was an error in the archive data.json, with the debts values')
        }
        console.log(`the debts in your account have a total of : ${debts}`)
    }catch(error){
        erroMessage('getDebts',error)
    }
}

const getWishList = async () => {

    try{

        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        
        const table = []
        for(let i = data.wishList.length - 1; i >= 0; i-- ){
            let need = data.wishList[i].priece - data.credit
            if(need <= 0){
                need = "you can buy this"
            }
            
            table.push({
                object: data.wishList[i].object,
                priece: data.wishList[i].priece,
                need : need,
                
            })
        }

        console.table(table)
    }catch(error){
        erroMessage('getWishList',error)
    }

}


const getTaxes = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        const taxes = data.taxes
        if(isNaN(taxes)){
            throw new Error('there was an error on the archive')
        }
        console.log(`Your taxes are of a total of ${taxes}`)

    }catch(error){
        erroMessage('getTaxes', error)
    }
}

const getObjetives = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        
        const table = []

        for(let i = data.Objetive.length -1; i >= 0; i--){
            table.push({
                name: data.Objetive[i].name,
                money: data.Objetive[i].money
            })
        }

        console.table(table)
    }catch(error){
        erroMessage('getObjetives', error)
    }
}


module.exports = {
    getCredit,
    getHistory,
    getBudget,
    getAllData,
    getDebts,
    getWishList,
    getTaxes,
    getObjetives
}