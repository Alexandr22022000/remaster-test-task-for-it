import {Status} from './appState';

export interface IState {
    appStatus: Status;
    query: string;
}

export interface IItem {
    name: string;
    img: string;
    id: number;
}

export interface IList {
    scroll: number;
    banner: string;
    items: IItem[];
}

export interface IUserData {
    id: number;
    name: string;
    img: string;
    bdate: string;
    city: string;
}
