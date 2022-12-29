import type {
    DataSet,
    DateString,
    Day,
    Settings
} from "./types";

import {
    formatDateString, getDateByDays
} from "./helpers";

const maxDataSet = 30;

export function getSettings() : Settings {

    const storage = localStorage.getItem('settings');

    return storage ? JSON.parse(storage) : {
        goal: 2500,
        water: 0
    }

}

export function saveSettings(settings : Settings) : void {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export function insert(water : number) : Day {

    const day : Day = getDay();

    day.data.push({
        t: new Date().toLocaleTimeString(),
        v: water
    });

    saveDay(day);
    return day;

}

export function remove(date : DateString, index : number) : Day {
    
    const day : Day = getDay(date);

    day.data.splice(index, 1);
    saveDay(day);

    return day;

}

export function getDay(date : DateString = formatDateString(new Date())) : Day {
    return getDataSet().find(day => day.date === date) ?? { date, data: [] };
}

export function getDataSet() : DataSet {
    return JSON.parse(localStorage.getItem('dataset') ?? '[]') as DataSet;
}

export function getFillDataSet(days : number) : DataSet {

    const dataSet : DataSet = [];

    for(let c = days * -1; c < 0; c++) {
        dataSet.push(getDay(formatDateString(getDateByDays(c + 1))));
    }

    return dataSet;

}

export function resetDataSet() : void {
    localStorage.setItem('dataset', '[]');
}

function saveDay(day : Day) : void {
    
    const dataSet : DataSet = getDataSet();
    const index : number | null = dataSet.findIndex(d => d.date === day.date) ?? null;

    if(index >= 0) dataSet[index] = day;
    else if(dataSet.push(day) > maxDataSet) dataSet.shift();

    saveDataSet(dataSet);

}

function saveDataSet(dataset : DataSet) : void {
    localStorage.setItem('dataset', JSON.stringify(dataset));
}