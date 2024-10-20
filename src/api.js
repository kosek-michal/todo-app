import axios from 'axios';

export const ITEMS_PER_PAGE = 2;

export const getItems = async (startIdx, count = ITEMS_PER_PAGE) => {
    const response = await axios.get(`/item?startidx=${startIdx}&count=${count}`);
    return response.data;
};

export const addItem = async (value) => {
    const response = await axios.post('/item', value, {

    });
    return response.data;
};

export const updateItem = async (id, value) => {
    const response = await axios.put(`/item/${id}`, value, {

    });
    return response.data;
};

export const deleteItem = async (id) => {
    const response = await axios.delete(`/item/${id}`);
    return response.data;
};