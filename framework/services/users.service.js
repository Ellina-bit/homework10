import fetch from 'node-fetch';
import urls from '../config/urls';

/*
* @param { get } Получить список пользователей
* @param {object} Создание пользователя
 */
const Users = {
  get: async (params) => {
    const r = await fetch(`${urls.reqres}api/users?${params}`, { method: 'GET' });
    return r;
  },
  getS: async (params) => {
    const r = await supertest(`${urls.reqres}`).get(`api/users?${params}`).set('Accept', 'application/json');
    return r;
  },
  create: async (user) => {
    const r = await fetch(`${urls.reqres}api/users`, { method: 'POST', body: JSON.stringify(user)});
    return r;
  },
};

const authHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer token=xUAqzSAyjKdfqAWy6Ba7Ed9D',
};

const Airports = {
  getAll: async (status = 200, params = '') => {
    const response = await fetch(`${urls.reqresAirportes}/favorites?${params}`, { method: 'GET', headers: authHeader });
    expect(response.status).toEqual(status);
    return response;
  },
  getAllJson: async (status = 200, params = '') => {
    const response = await Airports.getAll(status, params);
    const data = await response.json();
    return data;
  },
  getDistance: async (status = 200, params = '') => {
    const response = await fetch( `${urls.reqresAirportes}/airports/distance?${params}`, { method: 'POST', headers: authHeader });
    expect(response.status).toEqual(status);
    return response;
  },
  clearAllFavorites: async (status = 204) => {
    const deleteAllAirportResponse = await fetch(`${urls.reqresAirportes}/favorites/clear_all`, { method: 'DELETE', headers: authHeader });
    expect(deleteAllAirportResponse.status).toEqual(status);
    return deleteAllAirportResponse;
  },
  addFavorite: async (params = '', status = 201) => {
    const addNewAirportResponse = await fetch(`${urls.reqresAirportes}/favorites?${params}`, { method: 'POST', headers: authHeader });
    expect(addNewAirportResponse.status).toEqual(status);
    return addNewAirportResponse;
  },
  deleteFavorite: async (id = '', status = 204) => {
    const deleteAirportResponse = await fetch(`${urls.reqresAirportes}/favorites/${id}`, { method: 'DELETE', headers: authHeader });
    expect(deleteAirportResponse.status).toEqual(status);
    return deleteAirportResponse;
  },
  patchNote: async (id = '', note = '', status = 200) => {
    const patchAirportResponse = await fetch(`${urls.reqresAirportes}/favorites/${id}?${note}`, { method: 'PATCH', headers: authHeader });
    expect(patchAirportResponse.status).toEqual(status);
    return patchAirportResponse;
  },
};

export default Airports;
