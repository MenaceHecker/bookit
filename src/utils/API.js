import { createContext } from 'react';

function fetchPostJson(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

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

async function getResponseNum(promise, errorMessage) {
  const response = await getResponseJson(promise);
  if (!response.ok)
    return response;
  if (typeof response.data !== 'number')
    throw new Error('Unexpected response');
  if (response.data !== 0)
    return { ok: false, message: errorMessage };
  return { ok: true, message: 'Success' };
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

  #newSessionUrl(path) {
    const url = new URL(path, this.#baseUrl);
    url.searchParams.append('sid', this.#getSessionId());
    return url;
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
      url.searchParams.append('wantsPromotions', customerData.wantsPromotions);
    return await getResponseNum(fetch(url, { method: 'GET' }), 'Could not create user');
  }

  async activateCustomer(activationCode) {
    const url = new URL('api/activate', this.#baseUrl);
    url.searchParams.append('code', activationCode);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async getCurrentUser() {
    const url = this.#newSessionUrl('api/getCurrentUser');
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async updatePassword(oldPassword, newPassword) {
    const url = this.#newSessionUrl('api/updatePassword');
    url.searchParams.append('oldPassword', oldPassword);
    url.searchParams.append('newPassword', newPassword);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async updateProfile(profileData) {
    const url = this.#newSessionUrl('api/mpc');
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
    const url = this.#newSessionUrl('api/newmovie');
    return await getResponseText(fetchPostJson(url, movieData));
  }

  async listMovies() {
    const url = new URL('api/getlistings', this.#baseUrl);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async deleteMovie(id) {
    const url = this.#newSessionUrl('api/rmmovie');
    url.searchParams.append('id', id);
    return await getResponseNum(fetch(url, { method: 'DELETE' }), 'Could not delete movie');
  }

  async createCard(cardData) {
    const url = this.#newSessionUrl('api/addCard');
    const props = ['cardNumber', 'firstName', 'lastName', 'securityCode', 'billingAddress', 'expirationDate'];
    for (const prop of props)
      url.searchParams.append(prop, cardData[prop]);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async listCards() {
    const url = this.#newSessionUrl('api/listCards');
    url.searchParams.append('sid', this.#getSessionId());
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async updateCard(cardData) {
    const url = this.#newSessionUrl('api/updateCard');
    const props = ['cardId', 'cardNumber', 'billingAddress', 'expirationDate'];
    for (const prop of props)
      if (prop in cardData)
        url.searchParams.append(prop, cardData[prop]);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async deleteCard(cardId) {
    const url = this.#newSessionUrl('api/deleteCard');
    url.searchParams.append('cardId', cardId);
    return await getResponseText(fetch(url, { method: 'GET' }));
  }

  async createBooking(showingId, promoCode, tickets) {
    const url = this.#newSessionUrl('api/createBooking');
    return await getResponseText(fetchPostJson(url, { showingId, promoCode, tickets }));
  }

  async listBookings() {
    const url = this.#newSessionUrl('api/listBookings');
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async getBooking(bookingId) {
    const url = this.#newSessionUrl('api/listBookings');
    url.searchParams.append('bookingId', bookingId);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }

  async deleteBooking(bookingId) {
    const url = this.#newSessionUrl('api/deleteBooking');
    url.searchParams.append('bookingId', bookingId);
    return await getResponseText(fetch(url, { method: 'DELETE' }));
  }

  async getTicket(ticketId) {
    const url = this.#newSessionUrl('api/getTicket');
    url.searchParams.append('ticketId', ticketId);
    return await getResponseJson(fetch(url, { method: 'GET' }));
  }
}

export const APIContext = createContext(null);
