import { Document } from 'mongoose';
export interface ISong extends Document{
    readonly Song: string;  
    readonly Artist: string;
    readonly Writers: string[];
    readonly Album: string;
    readonly Year: number;
    readonly PlaysJune: number;
    readonly PlaysJuly: number;
    readonly PlaysAugust: number;
    //readonly TotalPlays: number; // Virtual property
}