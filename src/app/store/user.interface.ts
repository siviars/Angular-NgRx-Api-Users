import { Time } from "@angular/common";

export interface User {
    id: number,
    name: string,
    birth: Date,
    email: string,
    gender: string,
    status: string,
    comment: string,
    update: Date,
}