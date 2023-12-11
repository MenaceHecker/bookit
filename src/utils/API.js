import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
      return { ok: false, message: await response.text() };
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
  #sessionId;

  constructor(baseUrl, sessionId) {
    new URL(baseUrl); // throw exception if base URL is invalid
    this.#baseUrl = baseUrl;
    this.#sessionId = sessionId;
  }

  addOptions(fetchOptions) {
    return fetchOptions;
  }

  #newSessionUrl(path, prop = 'sid', overrideId = null) {
    const sessionId = overrideId ?? this.#sessionId;
    if (sessionId === null)
      throw new Error('Not logged in');
    const url = new URL(path, this.#baseUrl);
    url.searchParams.append(prop, sessionId);
    return url;
  }

  #fetchGet(url) {
    return fetch(url, this.addOptions({ method: 'GET' }));
  }

  #fetchPost(url) {
    return fetch(url, this.addOptions({ method: 'POST' }));
  }

  #fetchDelete(url) {
    return fetch(url, this.addOptions({ method: 'DELETE' }));
  }

  #fetchPostJson(url, data) {
    return fetch(url, this.addOptions({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }));
  }

  withSignal(abortSignal) {
    return new AbortableAPI(this.#baseUrl, this.#sessionId, abortSignal);
  }

  async login(email, password) {
    const url = new URL('api/login', this.#baseUrl);
    url.searchParams.append('email', email);
    url.searchParams.append('password', password);
    return await getResponseJson(this.#fetchGet(url));
  }

  async logout() {
    const url = this.#newSessionUrl('api/logout', 'sessionId');
    return await getResponseText(this.#fetchGet(url));
  }

  async sendPasswordToken(email) {
    const url = new URL('api/sendPasswordToken', this.#baseUrl);
    url.searchParams.append('email', email);
    return await getResponseText(this.#fetchGet(url));
  }

  async loginWithPasswordToken(token, newPassword) {
    const url = new URL('api/resetPasswordWithToken', this.#baseUrl);
    url.searchParams.append('token', token);
    url.searchParams.append('newPassword', newPassword);
    return await getResponseJson(this.#fetchGet(url));
  }

  async createCustomer(customerData) {
    const url = new URL('api/add', this.#baseUrl);
    const props = ['email', 'password', 'firstName', 'lastName', 'phoneNumber'];
    for (const prop of props)
      url.searchParams.append(prop, customerData[prop]);
    if ('wantsPromotions' in customerData)
      url.searchParams.append('wantsPromotions', customerData.wantsPromotions);
    return await getResponseNum(this.#fetchGet(url), 'Could not create user');
  }

  async activateCustomer(activationCode) {
    const url = new URL('api/activate', this.#baseUrl);
    url.searchParams.append('code', activationCode);
    return await getResponseText(this.#fetchGet(url));
  }

  async getCurrentUser(sessionId = null) {
    const url = this.#newSessionUrl('api/getCurrentUser', 'sid', sessionId);
    return await getResponseJson(this.#fetchGet(url));
  }

  async updatePassword(oldPassword, newPassword) {
    const url = this.#newSessionUrl('api/updatePassword');
    url.searchParams.append('oldPassword', oldPassword);
    url.searchParams.append('newPassword', newPassword);
    return await getResponseText(this.#fetchGet(url));
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
    return await getResponseText(this.#fetchGet(url));
  }

  async updateTargetUser(targetId, userData) {
    const url = new URL('api/updateTargetUser', this.#baseUrl);
    url.searchParams.append('targetId', targetId);
    const props = ['firstName', 'lastName', 'address', 'phoneNumber', 'wantsPromotions', 'suspended'];
    for (const prop of props)
      if (prop in userData)
        url.searchParams.append(prop, userData[prop]);
    return await getResponseText(this.#fetchPost(url));
  }

  async promoteToAdmin(targetId) {
    const url = this.#newSessionUrl('api/promoteToAdmin');
    url.searchParams.append('targetId', targetId);
    return await getResponseText(this.#fetchPost(url));
  }

  async deleteTargetUser(targetId) {
    const url = new URL('api/deleteTargetUser', this.#baseUrl);
    url.searchParams.append('targetId', targetId);
    return await getResponseText(this.#fetchDelete(url));
  }

  async createMovie(movieData) {
    const url = this.#newSessionUrl('api/newmovie');
    return await getResponseText(this.#fetchPostJson(url, movieData));
  }

  async listMovies() {
    const url = new URL('api/getlistings', this.#baseUrl);
    return await getResponseJson(this.#fetchGet(url));
  }

  async updateMovie(movieData) {
    const url = new URL('api/updateMovie', this.#baseUrl);
    return await getResponseJson(this.#fetchPostJson(url, movieData));
  }

  async deleteMovie(id) {
    const url = this.#newSessionUrl('api/rmmovie');
    url.searchParams.append('id', id);
    return await getResponseNum(this.#fetchDelete(url), 'Could not delete movie');
  }

  async createCard(cardData) {
    const url = this.#newSessionUrl('api/addCard');
    const props = ['cardNumber', 'firstName', 'lastName', 'securityCode', 'billingAddress', 'expirationDate'];
    for (const prop of props)
      url.searchParams.append(prop, cardData[prop]);
    return await getResponseText(this.#fetchGet(url));
  }

  async listCards() {
    const url = this.#newSessionUrl('api/listCards');
    return await getResponseJson(this.#fetchGet(url));
  }

  async updateCard(cardData) {
    const url = this.#newSessionUrl('api/updateCard');
    const props = ['cardId', 'cardNumber', 'securityCode', 'billingAddress', 'expirationDate'];
    for (const prop of props)
      if (prop in cardData)
        url.searchParams.append(prop, cardData[prop]);
    return await getResponseText(this.#fetchGet(url));
  }

  async deleteCard(cardId) {
    const url = this.#newSessionUrl('api/deleteCard');
    url.searchParams.append('cardId', cardId);
    return await getResponseText(this.#fetchGet(url));
  }

  async listTicketTypes() {
    const url = new URL('api/listTicketTypes', this.#baseUrl);
    return await getResponseJson(this.#fetchGet(url));
  }

  async createBooking(bookingData) {
    const url = this.#newSessionUrl('api/createBooking');
    return await getResponseText(this.#fetchPostJson(url, bookingData));
  }

  async listBookings() {
    const url = this.#newSessionUrl('api/listBookings');
    return await getResponseJson(this.#fetchGet(url));
  }

  async getBooking(bookingId) {

    const url = this.#newSessionUrl('api/getBooking');
    url.searchParams.append('bookingId', bookingId);
    return await getResponseJson(this.#fetchGet(url));
  }

  async deleteBooking(bookingId) {
    const url = this.#newSessionUrl('api/deleteBooking');
    url.searchParams.append('bookingId', bookingId);
    return await getResponseText(this.#fetchDelete(url));
  }

  async getTicket(ticketId) {
    const url = this.#newSessionUrl('api/getTicket');
    url.searchParams.append('ticketId', ticketId);
    return await getResponseJson(this.#fetchGet(url));
  }

  async listOrderEntries() {
    const url = this.#newSessionUrl('api/listOrderEntries');
    return await getResponseJson(this.#fetchGet(url));
  }

  async createPromotion(promotionData) {
    const url = this.#newSessionUrl('api/createPromotion');
    return await getResponseText(this.#fetchPostJson(url, promotionData));
  }

  async listAllPromotions() {
    const url = this.#newSessionUrl('api/listAllPromotions');
    return await getResponseJson(this.#fetchGet(url));
  }

  async getPromotionFromCode(promoCode) {
    const url = this.#newSessionUrl('api/getPromotionFromCode');
    url.searchParams.append('promoCode', promoCode);
    return await getResponseJson(this.#fetchGet(url));
  }

  async sendPromotion(promotionId) {
    const url = this.#newSessionUrl('api/sendPromotion');
    url.searchParams.append('promotionId', promotionId);
    return await getResponseText(this.#fetchPost(url));
  }

  async deletePromotion(promotionId) {
    const url = this.#newSessionUrl('api/deletePromotion');
    url.searchParams.append('promotionId', promotionId);
    return await getResponseText(this.#fetchDelete(url));
  }
}

class AbortableAPI extends API {
  #signal;

  constructor(baseUrl, sessionId, abortSignal) {
    super(baseUrl, sessionId);
    this.#signal = abortSignal;
  }

  addOptions(fetchOptions) {
    return { ...fetchOptions, signal: this.#signal };
  }
}

export const APIContext = createContext(null);

class APITools {
  #setRefreshToken;
  #signal;

  constructor(setRefreshToken, abortSignal) {
    this.#setRefreshToken = setRefreshToken;
    this.#signal = abortSignal;
  }

  get signal() { return this.#signal; }

  refresh() { this.#setRefreshToken(Symbol()); }

  refreshOnTimeout(delay) {
    const listener = () => { clearTimeout(timeoutId); };
    const timeoutId = setTimeout(() => {
      this.refresh();
      this.#signal.removeEventListener('abort', listener);
    }, delay);
    this.#signal.addEventListener('abort', listener);
  }
}

export function useApiData(callback, options = {}) {
  let api = useContext(APIContext);
  if ('api' in options)
    api = options.api;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCallback = useCallback(callback, options.deps ?? []);
  const [refreshToken, setRefreshToken] = useState(Symbol());
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const tools = new APITools(setRefreshToken, signal);
    memoCallback(api.withSignal(signal), tools);
    return () => { controller.abort(); };
  }, [refreshToken, memoCallback, api]);
  const refresh = useCallback(() => { setRefreshToken(Symbol()); }, []);
  return [refresh];
}
