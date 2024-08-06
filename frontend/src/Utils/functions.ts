import {Car,User} from './thingsTypes'
import {GridTemplate} from './thingsTypes'
function calcPer(part:number,whole:number):number{
    return (part/whole)*100
}
 export function countItems(arr: Car[]): number {
    let counter: number = 0; 

   
    for (let i : number = 0; i < arr.length; i++) {
        if(arr[i].kshirot === '1' || arr[i].kshirot === 'כשיר'){
            counter++;
        } 

    }
    
    
    return Math.floor(calcPer(counter,arr.length)); 
}
export function buildArrMakat(arr: Car[]): string[] {
    let Sarr: string[] = []; 
    for (let i :number = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].makat !== undefined) { 
            if (!Sarr.includes(arr[i].makat)) {
                Sarr.push(arr[i].makat);
            }
        }
    }
    return Sarr;
}
export function getGduds(arr: User[]):string[]{
    let myArray = new Array<string>(arr.length);
    for (let i : number = 0; i < myArray.length; i++) {
        myArray[i] = arr[i].gdud
        
    }
    return myArray
}
export function sumOfmakats(arr: Car[],arrOfMa: string[]): number[]{
   
    let myArray = new Array<number>(arrOfMa.length);
    for(let i:number = 0;i<myArray.length;i++){
        myArray[i] = 0;
    }
    for(let i = 0;i < arrOfMa.length;i++ ){
        for(let j: number = 0;j < arr.length;j++){
            if(arr[j].kshirot === 'כשיר' && arrOfMa[i] === arr[j].makat){
                myArray[i]++;
            }
        }
    }
    return myArray

    
}

export function forGrid(arr: Car[]): GridTemplate[] {
    let temp: GridTemplate[] = new Array(arr.length).fill(null).map(() => ({id:0, carNumber: '', kshirot: 'לא כשיר' }));
    for (let i: number = 0; i < arr.length; i++) {
        if(arr[i].kshirot === '1')
        {
        arr[i].kshirot = 'כשיר'
        }
        else if(arr[i].kshirot === '0'){arr[i].kshirot = 'לא כשיר'}
        temp[i] = {
            id: i,
            carNumber: arr[i].carNumber,
            
            kshirot: arr[i].kshirot
        };
    
    }
    return temp;
}
    export function getMakats(arr: Car[]): string[]{
   
        let myArray = new Array<string>();
       
        for(let i: number = 0;i<myArray.length;i++){
            myArray[i] = '';
        }
      
        for (let i = 0; i < arr.length; i++) {
            if(!myArray.includes(arr[i].makat) ){
                myArray.push(arr[i].makat)
            }
            
            
        }
       
        
        const filteredArray = myArray.filter(item => item !== undefined && item !=="adasd" );

        return filteredArray
    }
    export function getNewMakats (arr:Car[]):string[]{
        let newArr = new Array<string>(arr.length)
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].makat)
            
        }
        return newArr
    }
    export function getCarsMakats(arr: Car[]): Car[]{
   
        let myArray = new Array<Car>();

        // Iterate over each item in arr
        for (let car of arr) {
            // Check if there's already an object with the same makat in myArray
            let isDuplicate = myArray.some(myCar => myCar.makat === car.makat);
    
            // If no duplicate is found, add the current item to myArray
            if (!isDuplicate) {
                myArray.push(car);
            } else {
                
            }
        }
    
        return myArray;
    
        
    }
export function doublesM(arr: string[]): boolean {
    let isTrue = false
    for (let i = 0; i< arr.length; i++) {
      for (let j = i+1; j < arr.length; j++) {
        if(arr[j] === arr[i])
            isTrue = true
      }
       
    }
    return isTrue
}