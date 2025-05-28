declare type User = {
    id: string,
    username: string,
    password: string,
    email?: string,
    transactions: Transaction[]
    save(): T
}

declare type Transaction = {
    id: string,
    userId: string,
    amount: number,
    isExpense: boolean,
    desc: string,
    createdAt?: number,
    updatedAt?: number,
    category: Category,
    receipt?: any,
    notes?: string[]
    save(): T
}

declare type Category = {
    id: string,
    name: string,
    img?: string,
    transactions?: Transaction[]
    save(): T
}