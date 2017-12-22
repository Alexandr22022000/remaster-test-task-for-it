import {Status} from './applicationStats';

export type state = {
    status: Status,
    username: string,
    query: string
};

export type item = {
    name: string,
    img: string,
    id: number
};

export type list = {
    scroll: number,
    banner: string,
    items: item[],

};

export type userData = {
    id: number,
    name: string,
    img: string,
    bdate: string,
    city: string,
    country: string,
    education: string
};
