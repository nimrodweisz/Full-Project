import {  Types } from 'mongoose';


export type Car = {
    carNumber: string;
    makat: string;
    kshirot: string;
    gdud: string;
  };
 export type GridTemplate = {
    id : number;
    carNumber : string;
    kshirot: string
  }
  export type User = {
    _id: Types.ObjectId
    pernr : string;
    gdud: string;
    isManager: string
  }
 export interface UserContextType {
  users?: User[]
 }
 export interface CarsContextType {
    carDatas?: Car[];
}
export {};

declare global {
  interface Window {
    _paq: [string, ...any[]][];
  }
}

