import type {
    DataSet,
    DateString,
    Day,
    Settings
} from "./types";

import {
    formatDateString,
    getDateByDays
} from "./helpers";

const maxDataSet = 45;

export function getSettings() : Settings {

    const defaultSettings : Settings = {
        goal: 2500,
        water: 0,
        chart: 7
    }

    try {

        const storage = localStorage.getItem('settings');
        const settings  = storage ? JSON.parse(storage) : defaultSettings;
        
        if(typeof settings !== 'object' || !('goal' in settings)) {
            throw new Error('Settings is not Object');
        }

        return settings;

    } catch(err) {

        console.error(err);
        return defaultSettings;

    }

}

export function saveSettings(settings : Partial<Settings>) : void {
    const stored = getSettings();
    localStorage.setItem('settings', JSON.stringify({ ...stored, ...settings }));
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

    try {

        const dataSet : DataSet = JSON.parse(localStorage.getItem('dataset') ?? '[]') as DataSet;
        if(!Array.isArray(dataSet)) throw new Error('DataSet is not Array');
        return dataSet;

    } catch(err) {

        console.error(err);
        resetDataSet();
        return [];

    }

}

export function getFillDataSet(days : number) : DataSet {

    const dataSet : DataSet = [];

    for(let c = days * -1; c < 0; c++) {
        dataSet.push(getDay(formatDateString(getDateByDays(c + 1))));
    }

    return dataSet;

}

export function resetDataSet() : void {
    saveDataSet([]);
}

function saveDay(day : Day) : void {
    
    const dataSet : DataSet = getDataSet();
    const index : number = dataSet.findIndex(d => d.date === day.date);

    if(index >= 0) dataSet[index] = day;
    else if(dataSet.push(day) > maxDataSet) dataSet.shift();

    saveDataSet(dataSet);

}

function saveDataSet(dataset : DataSet) : void {
    localStorage.setItem('dataset', JSON.stringify(dataset));
}