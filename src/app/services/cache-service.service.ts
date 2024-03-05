import { Injectable } from '@angular/core';

/**
 * CACHE KEYS NAMES ENUM
 */
export enum CacheKeys {
  app = 'CYRANO_',
  token = 'access_token',
  user = 'user',
  activeTheme = 'active_theme',
  activeLanguage = 'active_language',
  rememberMe = 'remember_me',
  userEmail = 'user_email',
  skipLocation = 'skip_location',
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // --------------------------------------
  // local storage
  // -------------------------------------

  /**
   * Save value to local storage
   *
   * @param key
   * @param value
   */
  saveLocalStorage(key: CacheKeys, value: any): void {
    localStorage.setItem(CacheKeys.app + key, JSON.stringify(value));
  }

  /**
   * Remove value from local storage
   *
   * @param key
   */
  removeLocalStorage(key: CacheKeys): void {
    localStorage.removeItem(CacheKeys.app + key);
  }

  /**
   * Clear local storage
   */
  clearLocalStorage(): void {
    localStorage.clear();
  }

  /**
   * Fetch value from local storage
   *
   * @param key
   */
  getLocalStorage(key: CacheKeys): any {
    let cache = localStorage.getItem(CacheKeys.app + key);
    if (!cache) {
      return null;
    }
    try {
      cache = JSON.parse(cache);
    } catch (e) {
      return cache;
    }
    return cache;
  }

  /*
      ===========================================
        Session storage
      ===========================================
    */
  /**
   * Set value in session storage
   *
   * @param key
   * @param data
   */
  setSessionData(key: CacheKeys, data): void {
    sessionStorage.setItem(CacheKeys.app + key, JSON.stringify(data));
  }

  /**
   * Get value in session storage
   *
   * @param key
   */
  getSessionData(key: CacheKeys): any {
    return JSON.parse(sessionStorage.getItem(CacheKeys.app + key));
  }

  /**
   * Delete value from session storage
   *
   * @param key
   */
  deleteSessionData(key: CacheKeys): void {
    sessionStorage.removeItem(CacheKeys.app + key);
  }

  /**
   * Clear session storage
   */
  clearSession(): void {
    sessionStorage.clear();
  }

  /**
   * Cache user data and auth token
   *
   * @param user
   * @param accessToken
   * @param remember
   */
  cacheUserData(user: any, accessToken: any, remember = false): void {
    if (remember) {
      this.saveLocalStorage(CacheKeys.token, accessToken);
    } else {
      this.setSessionData(CacheKeys.user, user);
      this.setSessionData(CacheKeys.token, accessToken);
    }
  }
}
