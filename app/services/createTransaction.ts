import { instance } from "../lib/axios";

export async function createTransaction(transaction: Transaction, userId: string) {
    try{
        const response = await instance.post('transaction/create', {transaction, userId})
        const newTransaction : Transaction = response.data
        console.log("Transacción creada", newTransaction)
    }catch(error: any){
        console.log("Imposible crear la transacción", error)
    }
}