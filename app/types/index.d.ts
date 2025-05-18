declare type User = {
    username: string,
    password: string,
    email?: string,
    transactions: Transaction[]
    save(): T
}

declare type Transaction = {
    user: string,
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
    name: string,
    img?: string,
    transactions?: Transaction[]
}