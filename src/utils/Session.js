import { createContext, useEffect, useMemo, useState } from 'react';

function saveToStorage({ sessionId, currentUser }) {
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function clearStorage() {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('currentUser');
}

async function initSessionData(api, setSessionData) {
  const sessionId = localStorage.getItem('sessionId');
  const currentUserItem = localStorage.getItem('currentUser');
  if (sessionId !== null && currentUserItem !== null) {
    try {
      const currentUser = JSON.parse(currentUserItem);
      setSessionData({ sessionId, currentUser });
    } catch {
      return; // ignore JSON syntax errors
    }
    const response = await api.getCurrentUser(sessionId);
    if (response.ok) {
      const sessionData = { sessionId, currentUser: response.data };
      setSessionData(sessionData);
      saveToStorage(sessionData);
    } else {
      setSessionData(null);
      clearStorage();
    }
  }
}

class Session {
  #api;
  #sessionData;
  #setSessionData;
  #currentUser;

  constructor(api, sessionData, setSessionData) {
    this.#api = api;
    this.#sessionData = sessionData;
    this.#setSessionData = setSessionData;
  }

  get currentUser() {
    return this.#sessionData !== null ? this.#sessionData.currentUser : null;
  }

  async #updateAfterLogin(sessionId) {
    const response = await this.#api.getCurrentUser(sessionId);
    if (!response.ok) {
      await this.logout();
      return response;
    }
    const currentUser = response.data;
    const sessionData = { sessionId, currentUser };
    this.#setSessionData(sessionData);
    saveToStorage(sessionData);
    return response;
  }

  async login(email, password) {
    const response = await this.#api.login(email, password);
    if (!response.ok)
      return response;
    return await this.#updateAfterLogin(response.data.sessionId);
  }

  async loginWithPasswordToken(token, newPassword) {
    const response = await this.#api.loginWithPasswordToken(token, newPassword);
    if (!response.ok)
      return response;
    return await this.#updateAfterLogin(response.data.sessionId);
  }

  async logout() {
    this.#setSessionData(null);
    clearStorage();
    await this.#api.logout();
  }
}

export const SessionContext = createContext(null);

export function useSession(api, sessionData, setSessionData) {
  const [sessionDataInit, setSessionDataInit] = useState(false);
  useEffect(() => {
    if (!sessionDataInit) {
      initSessionData(api, setSessionData);
      setSessionDataInit(true);
    }
  }, [api, setSessionData, sessionDataInit]);
  return useMemo(() => new Session(api, sessionData, setSessionData), [api, sessionData, setSessionData]);
} 
