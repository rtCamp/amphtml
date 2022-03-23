import {logger} from '#preact/logger';

import {AmpAccessEvaluator} from './access-expr';
import {AccessExpressionProcessor} from './calculator-expr';

/**
 * TODO (@AnuragVasanwala): Need discussion regarding configuration for javascript variable notation: defaultOperation or default_operation?
 * TODO (@deepaklalwani97): Store all variables in single object in localStorage | bento-access-newspackCid -> {...}
 * TODO (@deepaklalwani97): Frequency of any operation
 */
export class BlockProcessor {
  /**
   * @param {!JsonObject} configuration
   * @param readyCallback
   */
  constructor(configuration, readyCallback) {
    /** @type {!JsonObject} */
    this.configuration = configuration;

    // TODO (@AnuragVasanwala): Use '_' as suffix for private variable & function
    this.accessExpProcessor = new AccessExpressionProcessor();
    this.accessEvaluator = new AmpAccessEvaluator();

    this.readyCallback = readyCallback;

    this.handleDynamicOperation();
    // // Check variable existence with localStorage
    // if (!this.variableExists()) {
    //   // Perform necessary default-operation
    // }
  }

  /**
   * Check each configuration variable against local storage
   * @return {boolean} return true if all variable are exists in localStorage
   */
  variablesExists() {
    let result = true;

    // TODO(@AnuragVasanwala): Replace `for-each` loop with `for-in` loop for better performance
    Object.keys(this.configuration).forEach(function (variable) {
      // logger.info(variable);

      if (variable !== 'top_level' && localStorage.getItem(variable) === null) {
        // logger.error(variable, 'does not exists');
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
    return {...localStorage};
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
   * @param callback
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
   * @param callback
   * @return {*}
   */
  processDynamicOperation(jsonData, callback) {
    if (jsonData === null) {
      callback(null);
      return;
    }

    switch (jsonData.type.toUpperCase()) {
      case 'GET':
        // TODO (@AnuragVasanwala): Add support to re-compute parameters
        this.handleFetchRequest('GET', jsonData, (res) => {
          Object.keys(res).forEach(function (variable) {
            logger.error(
              'GET : localStorage[',
              variable,
              '] = ',
              res[variable]
            );
            localStorage.setItem(variable, res[variable]);
          });
          callback(res);
        });
        break;
      case 'POST':
        return this.handleFetchRequest('POST', jsonData, (res) => {
          Object.keys(res).forEach(function (variable) {
            logger.error(
              'POST : localStorage[',
              variable,
              '] = ',
              res[variable]
            );
            localStorage.setItem(variable, res[variable]);
          });
          callback(res);
        });
        break;
      case 'VARIABLE':
        // Array Index: [0] = <variableName> | [1] = '=' | [2] = <operation>
        const opData = jsonData.operation.split('=');
        const result = this.compute(opData[1].trim());
        logger.error(
          'DYNAMIC : localStorage[',
          opData[0].trim(),
          '] = ',
          result
        );
        localStorage.setItem(opData[0].trim(), result);
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
      // Execute top-level->defaultOperation
      scope.processDynamicOperation(
        scope.configuration.top_level.default_operation,
        (res) => {
          // logger.info(res);
          Object.keys(res).forEach(function (variable) {
            logger.error(
              'DEF : localStorage[',
              variable,
              '] = ',
              res[variable]
            );
            localStorage.setItem(variable, res[variable]);
          });

          currPos += 1;
          logger.info('COUNTER: ', currPos, configLen);
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
      // Top-Level Default Operation Block
      if (variable !== 'top_level') {
        if (localStorage.getItem(variable) === null) {
          scope.processDynamicOperation(
            scope.configuration[variable].default_operation,
            (opt_res) => {
              currPos += 1;
              logger.info('COUNTER: ', currPos, configLen);
              if (currPos == configLen) {
                scope.readyCallback(scope);
              }
            }
          );
        }

        if (scope.evaluate(scope.configuration[variable].condition)) {
          // True Operation Block
          scope.processDynamicOperation(
            scope.configuration[variable].true_operation,
            (opt_res) => {
              currPos += 1;
              logger.info('COUNTER: ', currPos, configLen);
              if (currPos == configLen) {
                scope.readyCallback(scope);
              }
            }
          );
        } else {
          // False Operation Block
          scope.processDynamicOperation(
            scope.configuration[variable].false_operation,
            (opt_res) => {
              currPos += 1;
              logger.info('COUNTER: ', currPos, configLen);
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
   * WIP
   * @param {!JsonData} varJsonConfiguration
   * @param {string} variableName
   * @return {boolean}
   */
  isExpired(varJsonConfiguration, variableName) {
    const varData = JSON.parse(localStorage.getItem(variableName));
    const currentDate = new Date(); //Year, Month, Date
    const expirationDate = new Date(varData.expiration); //Year, Month, Date

    if (currentDate < expirationDate) {
      return true;
    } else {
      return false;
    }

    //     switch (varJsonData.expiration) {
    //       case 'daily':
    //         break;
    //       case 'weekly':
    //         break;
    //       case 'monthly':
    //         break;
    //       default:
    //         break;
    //     }
    //   }
  }
}
