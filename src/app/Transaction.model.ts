export interface SimplifiedTransaction {
    signature: string;
    from: string;
    to: string;
    amount: number;
    fee: number;
    memo: string;
    blockTime: number;
}