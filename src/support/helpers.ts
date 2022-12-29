export function dayweek(value : number) : string {

    switch(value) {
        case 0:  return 'Domingo';
        case 1:  return 'Segunda-feira';
        case 2:  return 'Terça-feira';
        case 3:  return 'Quarta-feira';
        case 4:  return 'Quinta-feira';
        case 5:  return 'Sexta-feira';
        case 6:  return 'Sábado';
        default: return ' ... ';
    }
    
}

export function getLastDays(last : number = 30) : Date[] {
    
    const days : Date[] = [];

    for(let c = 0; c < last; c++) {
        days.push(getDateByDays(c === 0 ? 0 : c * - 1));
    }

    return days;

}

export function indexDayWeek(init : number = 0) : number[] {

    let index : number[] = [];

    if(init < 0 || init > 6) init = 0;

    for(let c = 0; c < 7; c++) {
        const value = c + init;
        index.push(value > 6 ? value - 7 : value);
    }

    return index;

}

export function getDateByDays(numOfDays : number, date : Date = new Date()) : Date {

    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() + numOfDays);

    return daysAgo;

}

export function natural(n : number) : number {
    return (n < 0) ? n * -1 : n;
}