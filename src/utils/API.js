import { createContext } from 'react';

async function getResponseText(promise) {
  try {
    const response = await promise;
    return { ok: response.ok, message: await response.text() };
  } catch (err) {
    switch (err.name) {
      case 'TypeError': throw new Error('Connection error', { cause: err });
      default: throw err;
    }
  }
}

async function getResponseJson(promise) {
  try {
    const response = await promise;
    if (!response.ok)
      throw { ok: false, message: await response.text() };
    return { ok: true, data: await response.json() };
  } catch (err) {
    switch (err.name) {
      case 'SyntaxError': throw new Error('Unexpected response', { cause: err });
      case 'TypeError': throw new Error('Connection error', { cause: err });
      default: throw err;
    }
  }
}

export class API {
  #baseUrl;

  constructor(baseUrl) {
    new URL(baseUrl); // throw exception if base URL is invalid
    this.#baseUrl = baseUrl;
  }

  #getSessionId() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId === null)
      throw new Error('Not logged in');
    return sessionId;
  }

  async login(email, password) {
    const url = new URL('api/login', this.#baseUrl);
    url.searchParams.append('email', email);
    url.searchParams.append('password', password);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async logout() {
    const url = new URL('api/logout', this.#baseUrl);
    url.searchParams.append('sessionId', this.#getSessionId());
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async sendPasswordToken(email) {
    const url = new URL('api/sendPasswordToken', this.#baseUrl);
    url.searchParams.append('email', email);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async loginWithPasswordToken(token, newPassword) {
    const url = new URL('api/resetPasswordWithToken', this.#baseUrl);
    url.searchParams.append('token', token);
    url.searchParams.append('newPassword', newPassword);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async createCustomer(customerData) {
    const url = new URL('api/add', this.#baseUrl);
    const props = ['email', 'password', 'firstName', 'lastName', 'phoneNumber'];
    for (const prop of props)
      url.searchParams.append(prop, customerData[prop]);
    if ('wantsPromotions' in customerData)
      url.searchParams.append(prop, customerData.wantsPromotions);
    const response = await getResponseJson(fetch(url, { method: 'GET' }));
    if (!response.ok)
      return response;
    if (typeof response.data !== 'number')
      throw new Error('Unexpected response');
    if (response.data !== 0)
      return { ok: false, message: 'Could not create user' };
    return { ok: true, message: 'Success' };
  }

  async activateCustomer(activationCode) {
    const url = new URL('api/activate', this.#baseUrl);
    url.searchParams.append('code', activationCode);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async getCurrentUser() {
    const url = new URL('api/getCurrentUser', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async updatePassword(oldPassword, newPassword) {
    const url = new URL('api/updatePassword', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    url.searchParams.append('oldPassword', oldPassword);
    url.searchParams.append('newPassword', newPassword);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async updateProfile(profileData, email) { // TODO: remove email parameter
    const url = new URL('api/mpc', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    url.searchParams.append('email', email);
    if ('firstName' in profileData)
      url.searchParams.append('ufChange', profileData.firstName);
    if ('lastName' in profileData)
      url.searchParams.append('ulChange', profileData.lastName);
    const props = ['phoneNumber', 'wantsPromotions'];
    for (const prop of props)
      if (prop in profileData)
        url.searchParams.append(prop, profileData[prop]);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async createMovie(movieData) {
    const url = new URL('api/newmovie', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    return await getResponseText(fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    }));
  }

  async listMovies() {
    const url = new URL('api/getlistings', this.#baseUrl);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async deleteMovie(id) {
    const url = new URL('api/rmmovie', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    url.searchParams.append('id', id);
    const response = await getResponseJson(fetch(url, { method: 'DELETE' }));
    if (!response.ok)
      return response;
    if (typeof response.data !== 'number')
      throw new Error('Unexpected response');
    if (response.data !== 0)
      return { ok: false, message: 'Could not delete movie' };
    return { ok: true, message: 'Success' };
  }

  async updateCard(cardData) {
    const url = new URL('api/updateCard', this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    url.searchParams.append('cardId', cardData.);
    url.searchParams.append('newPassword', newPassword);
  }
}

export const APIContext = createContext(null);
