declare type User = {
    id: string,
    username: string,
    password: string,
    email?: string,
    imgUrl?: string,
    transactions: Transaction[]
    save(): T
}

declare type Transaction = {
    _id: string,
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
    shownName: string,
    url?: string,
    transactions?: Transaction[]
    save(): T
}