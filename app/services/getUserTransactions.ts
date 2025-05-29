import { instance } from "../lib/axios"

export async function getUserTransactions (userId:string) {
    try{
        console.log("log de pruba: userId", userId)
        const response = await instance.post('transaction/get', {userId: userId})
        const transactions : Transaction[] = response.data.transactions
        return transactions

    }catch(error: any){
        console.log("Imposible recuperar las transacciones del usuario", userId, error)
    }
}