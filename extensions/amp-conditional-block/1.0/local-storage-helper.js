/**
 * A helper utility for localStorage with expiration feature.
 */
export class LocalStorageHelper {
  /** Stores Key-Value Pair */
  static keyValuePair = {};
  /** Stores Key-Expiration Pair */
  static keyExpirationPair = {};

  /**
   * Static constructor to initializes helper class
   */
  static {
    // Check for 'conditional-block' existance
    if (localStorage.getItem('conditional-block') !== null) {
      // Load and Proecess existing Key-Value-Expiration pair
      LocalStorageHelper.processLocalStorage();
    }
  }

  /**
   * Loads and Process existing 'conditional-block' Key-Value-Expiration pair.
   */
  static processLocalStorage() {
    let data = localStorage.getItem('conditional-block');
    // Process only if 'conditional-block' exists
    if (data !== null) {
      data = JSON.parse(data);
      Object.keys(data).forEach(function (variable) {
        LocalStorageHelper.keyValuePair[variable] = data[variable].value;
        LocalStorageHelper.keyExpirationPair[variable] = data[variable].exp;
      });
    }
  }

  /**
   * Save Key-Value-Expiration
   */
  static saveKVE() {
    const result = {};
    Object.keys(LocalStorageHelper.keyValuePair).forEach(function (variable) {
      const data = {};
      data['value'] = LocalStorageHelper.keyValuePair[variable];
      data['exp'] = LocalStorageHelper.keyExpirationPair[variable];
      result[variable] = data;
    });

    localStorage.setItem('conditional-block', JSON.stringify(result));
  }

  /**
   * Similar to 'localStorage.getItem' but returns null if key is expired.
   * @param {string} key
   * @return {*} Returns key-value if not expired, else null.
   */
  static getItem(key) {
    // Return null is key does not exists
    if (LocalStorageHelper.keyValuePair === null) {
      return null;
    }

    // Return null if key is undefined
    if (LocalStorageHelper.keyValuePair[key] === undefined) {
      return null;
    }

    // Return null if key is expired
    if (
      Date.now() > LocalStorageHelper.keyExpirationPair[key] &&
      // -1 represents NEVER to expire
      LocalStorageHelper.keyExpirationPair[key] != -1
    ) {
      // Delete expired Key-Value
      delete LocalStorageHelper.keyValuePair[key];
      // Delete expired Key-Expiration
      delete LocalStorageHelper.keyExpirationPair[key];

      // Save to localStorage with updated values
      this.saveKVE();

      // Return null for expired key
      return null;
    }

    // Return valid key value
    return LocalStorageHelper.keyValuePair[key];
  }

  /**
   * Similar to 'localStorage.setItem' but also stored expiration, if provided
   * @param {string} key
   * @param {*} value
   * @param {int} expiration
   */
  static setItem(key, value, expiration = null) {
    // Add/Update Key-Value Pair
    LocalStorageHelper.keyValuePair[key] = value;

    // Add/Update new Expiration
    if (expiration !== null) {
      // Add/Update Key-Expiration Pair
      LocalStorageHelper.keyExpirationPair[key] = expiration;
    }

    // if no expiration does not exists for Key-Expiration, set default to never expire with -1
    if (LocalStorageHelper.keyExpirationPair[key] === null) {
      // Set it to never expire with -1
      LocalStorageHelper.keyExpirationPair[key] = -1;
    }

    // Store updated Key-Value-Expiration
    LocalStorageHelper.saveKVE();
  }

  /**
   * Returns JSON Objcet of valid Key-Value Pair
   * @return {JsonObject}
   */
  static getAsJsonObject() {
    const result = {};
    Object.keys(LocalStorageHelper.keyValuePair).forEach(function (variable) {
      const value = LocalStorageHelper.getItem(variable);
      if (value !== null) {
        result[variable] = LocalStorageHelper.getItem(variable);
      }
    });

    return result;
  }
}
