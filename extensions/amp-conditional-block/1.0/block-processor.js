import {AmpAccessEvaluator} from './access-expr';
import {AccessExpressionProcessor} from './calculator-expr';
import {LocalStorageHelper} from './local-storage-helper';

/**
 * TODO (@AnuragVasanwala): Need discussion regarding configuration for javascript variable notation: defaultOperation or default_operation?
 * TODO (@deepaklalwani97): Store all variables in single object in localStorage | bento-access-newspackCid -> {...}
 * TODO (@deepaklalwani97): Frequency of any operation
 */
export class BlockProcessor {
  /**
   * @param {!JsonObject} configuration
   * @param {function()} readyCallback
   */
  constructor(configuration, readyCallback) {
    /** @type {!JsonObject} */
    this.configuration = configuration;

    // TODO (@AnuragVasanwala): Use '_' as suffix for private variable & function
    this.accessExpProcessor = new AccessExpressionProcessor();
    this.accessEvaluator = new AmpAccessEvaluator();

    this.readyCallback = readyCallback;
    this.handleDynamicOperation();
  }

  /**
   * Check each configuration variable against local storage
   * @return {boolean} return true if all variable are exists in localStorage
   */
  variablesExists() {
    let result = true;

    // TODO(@AnuragVasanwala): Replace `for-each` loop with `for-in` loop for better performance
    Object.keys(this.configuration).forEach(function (variable) {
      if (
        variable !== 'top_level' &&
        LocalStorageHelper.getItem(variable) === null
      ) {
        result = false;
        return false;
      }
    });

    if (result) {
      // logger.info('All variable exists');
    }
    return result;
  }

  /**
   *
   * @return {!JsonObject}
   */
  localStorageAsJsonObject() {
    return LocalStorageHelper.getAsJsonObject();
  }

  /**
   * Computes the mathematical expression with variable support
   * @param {string} expr
   * @return {number}
   */
  compute(expr) {
    const localStorageResult = this.localStorageAsJsonObject();
    const isNumeric = (num) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(String(num));
    Object.keys(localStorageResult).forEach(function (variable) {
      if (isNumeric(localStorageResult[variable])) {
        localStorageResult[variable] = parseInt(localStorageResult[variable]);
      } else if (
        localStorageResult[variable] === 'true' ||
        localStorageResult[variable] === 'false'
      ) {
        localStorageResult[variable] =
          localStorageResult[variable] === 'true' ? true : false;
      }
    });
    const result = this.accessExpProcessor.evaluate(expr, localStorageResult);
    return result;
  }

  /**
   * Evaluate the mathematical expression with variable support
   * @param {string} expr
   * @return {boolean}
   */
  evaluate(expr) {
    const localStorageResult = this.localStorageAsJsonObject();
    const isNumeric = (num) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(String(num));

    Object.keys(localStorageResult).forEach(function (variable) {
      if (isNumeric(localStorageResult[variable])) {
        localStorageResult[variable] = parseInt(localStorageResult[variable]);
      } else if (
        localStorageResult[variable] === 'true' ||
        localStorageResult[variable] === 'false'
      ) {
        localStorageResult[variable] =
          localStorageResult[variable] === 'true' ? true : false;
      }
    });
    const result = this.accessEvaluator.evaluate(expr, localStorageResult);
    return result;
  }

  /**
   * Search through expr for `COOKIE` or `localStorage`, and retrieve respected value
   * @param {string} expr Expression to be parsed
   * @return {string|null} Returns retrieved value from client if available else null
   */
  processParameterValue(expr) {
    const result = this.accessExpProcessor.evaluate(expr, {});
    return result;
  }

  /**
   * Handles fetch request
   * @param {string} method
   * @param {!JsonObject} jsonData
   * @param {function()} callback
   * @return {string}
   */
  handleFetchRequest(method, jsonData, callback) {
    if ('GET' === method) {
      const scope = this;
      // Traverse through all parameters
      Object.keys(jsonData.parameters).forEach(function (variable) {
        // Retrieve parameter value from client
        const result = scope.processParameterValue(
          jsonData.parameters[variable]
        );
        // Update parameter value
        jsonData.parameters[variable] = result;
      });
      jsonData.url += '?' + new URLSearchParams(jsonData.parameters).toString();
    } else {
      const scope = this;
      // Traverse through all parameters
      Object.keys(jsonData.parameters).forEach(function (variable) {
        // Retrieve parameter value from client
        const result = scope.processParameterValue(
          jsonData.parameters[variable]
        );
        // Update parameter value
        jsonData.parameters[variable] = result;
      });
      jsonData.options.body = JSON.stringify(jsonData.parameters);
    }

    fetch(jsonData.url, jsonData.options)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        callback(error);
      });
  }

  /**
   * Processes dynamic operation
   * @param {!JsonObject} jsonData
   * @param {number} expiration
   * @param {function()} callback
   * @return {*}
   */
  processDynamicOperation(jsonData, expiration, callback) {
    if (jsonData === null) {
      callback(null);
      return;
    }

    switch (jsonData.type.toUpperCase()) {
      case 'GET':
        // TODO (@AnuragVasanwala): Add support to re-compute parameters
        this.handleFetchRequest('GET', jsonData, (res) => {
          Object.keys(res).forEach(function (variable) {
            LocalStorageHelper.setItem(variable, res[variable], expiration);
          });
          callback(res);
        });
        break;
      case 'POST':
        return this.handleFetchRequest('POST', jsonData, (res) => {
          Object.keys(res).forEach(function (variable) {
            LocalStorageHelper.setItem(variable, res[variable], expiration);
          });
          callback(res);
        });
        break;
      case 'VARIABLE':
        // Array Index: [0] = <variableName> | [1] = '=' | [2] = <operation>
        const opData = jsonData.operation.split('=');
        const result = this.compute(opData[1].trim());
        LocalStorageHelper.setItem(opData[0].trim(), result, expiration);
        callback(result);
        break;
      //operation;
      case 'FUNCTION':
        // TODO(@AnuragVasanwala): To be decided
        break;
      default:
        break;
    }
  }

  /**
   * Initiate and processes dynamic operation on each configuration object
   */
  handleDynamicOperation() {
    const scope = this;

    // STEP 1: Check all jsonConfiguration variables with localStorage
    if (scope.variablesExists() == false) {
      const expiration = scope.computeExpiration(
        scope.configuration.top_level.expiration
      );

      // Execute top-level->defaultOperation
      scope.processDynamicOperation(
        scope.configuration.top_level.default_operation,
        expiration,
        (res) => {
          Object.keys(res).forEach(function (variable) {
            LocalStorageHelper.setItem(variable, res[variable], expiration);
          });

          currPos += 1;
          if (currPos == configLen) {
            scope.readyCallback(this);
          }
        }
      );
    }

    const configLen = Object.keys(this.configuration).length - 1;
    let currPos = 0;
    // TODO(@AnuragVasanwala): Replace `for-each` loop with `for-in` loop for better performance
    Object.keys(this.configuration).forEach(function (variable) {
      // Variable Operation Block
      if (variable !== 'top_level') {
        // If variable is null, perform default operation
        if (LocalStorageHelper.getItem(variable) === null) {
          const expiration = scope.computeExpiration(
            scope.configuration[variable].expiration
          );

          scope.processDynamicOperation(
            scope.configuration[variable].default_operation,
            expiration,
            (opt_res) => {
              currPos += 1;
              if (currPos == configLen) {
                scope.readyCallback(scope);
              }
            }
          );
        }

        // Evaluate condition
        if (scope.evaluate(scope.configuration[variable].condition)) {
          // True Operation Block
          const expiration = null;
          scope.processDynamicOperation(
            scope.configuration[variable].true_operation,
            expiration,
            (opt_res) => {
              currPos += 1;

              if (currPos == configLen) {
                scope.readyCallback(scope);
              }
            }
          );
        } else {
          // False Operation Block
          const expiration = null;
          scope.processDynamicOperation(
            scope.configuration[variable].false_operation,
            expiration,
            (opt_res) => {
              currPos += 1;

              if (currPos == configLen) {
                scope.readyCallback(scope);
              }
            }
          );
        }
      }
    });
  }

  /**
   *
   * @param {string} expiration
   * @return {int}
   */
  computeExpiration(expiration) {
    switch (expiration) {
      case 'once':
        return -1; // Never expire
        break;
      case 'daily':
        return Date.now() + 86400000; // Expires daily
        break;
      case 'weekly':
        return Date.now() + 604800000; // Expires weekly (every 7 days)
        break;
      case 'monthly':
        return Date.now() + 2592000000; // Expires monthly (every 30 days)
        break;
      case 'always':
        return 0; // Always expires
        break;
      default:
        return -1; // Never expire
        break;
    }
  }
}
