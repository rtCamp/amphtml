import * as Preact from '#preact';
import {useCallback, useEffect, useRef, useState} from '#preact';
import {ContainWrapper} from '#preact/component';

import {useStyles} from './component.jss';

/**
 * @param {!BentoCurrencyConverter.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoCurrencyConverter({
  fromCurrencySymbol = 'USD',
  toCurrencySymbol = 'EUR',
  ...rest
}) {
  // const styles = useStyles();

  /** State Variables */
  const [currencyConversionRate, setcurrencyConversionRate] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /** DOM References */
  const fromCurrencySelectRef = useRef(null);
  const fromCurrencyInputRef = useRef(null);
  const toCurrencySelectRef = useRef(null);
  const toCurrencyInputRef = useRef(null);

  useEffect(() => {
    fetch(
      'https://freecurrencyapi.net/api/v2/latest?apikey=6345fea0-5e88-11ec-93a8-23b55f23c721'
    )
      .then((response) => response.json())
      .then((jsonData) => {
        jsonData.data['USD'] = 1;
        setcurrencyConversionRate(jsonData.data);
        setLoadingState(false);
      })
      .catch((e) => {
        setErrorState(true);
        setErrorMessage(e);
      });
  }, [
    fromCurrencySelectRef,
    toCurrencySelectRef,
    fromCurrencySymbol,
    toCurrencySymbol,
  ]);

  const fromValueChanged = useCallback(() => {
    const fromCurrencyRate = parseFloat(fromCurrencySelectRef.current?.value);
    const toCurrencyRate = parseFloat(toCurrencySelectRef.current?.value);

    const fromCurrencyValue = parseFloat(fromCurrencyInputRef.current?.value);

    const fromToUSD = fromCurrencyValue / fromCurrencyRate;
    if (toCurrencyInputRef.current) {
      toCurrencyInputRef.current.value = toCurrencyRate * fromToUSD;
    }
  }, [fromCurrencySelectRef, toCurrencySelectRef, fromCurrencyInputRef]);

  const toValueChanged = useCallback(() => {
    const fromCurrencyRate = parseFloat(fromCurrencySelectRef.current?.value);
    const toCurrencyRate = parseFloat(toCurrencySelectRef.current?.value);

    const toCurrencyValue = parseFloat(toCurrencyInputRef.current?.value);

    const toToUSD = toCurrencyValue / toCurrencyRate;
    if (fromCurrencyInputRef.current) {
      fromCurrencyInputRef.current.value = fromCurrencyRate * toToUSD;
    }
  }, [fromCurrencySelectRef, toCurrencySelectRef, toCurrencyInputRef]);

  return (
    <ContainWrapper layout size paint {...rest}>
      {errorState && <div>{errorMessage}</div>}
      {loadingState && <div>Loading...</div>}
      {!loadingState && (
        <div>
          <div>
            <span>From:</span>
            <span>
              <select
                ref={fromCurrencySelectRef}
                id="fromCurrency"
                name="fromCurrency"
                onChange={toValueChanged}
              >
                {(() => {
                  const container = [];
                  if (currencyConversionRate !== undefined) {
                    const currencyKeys = Object.keys(
                      currencyConversionRate
                    ).sort();
                    for (const key of currencyKeys) {
                      if (key === fromCurrencySymbol) {
                        container.push(
                          <option value={currencyConversionRate[key]} selected>
                            {key}
                          </option>
                        );
                      } else {
                        container.push(
                          <option value={currencyConversionRate[key]}>
                            {key}
                          </option>
                        );
                      }
                    }
                  }
                  return container;
                })()}
              </select>
            </span>
            <span>
              <input
                ref={fromCurrencyInputRef}
                type="number"
                onChange={fromValueChanged}
              />
            </span>
          </div>
          <div>
            <span>To:</span>
            <span>
              <select
                ref={toCurrencySelectRef}
                id="toCurrency"
                name="toCurrency"
                onChange={fromValueChanged}
              >
                {(() => {
                  const container = [];
                  if (currencyConversionRate !== undefined) {
                    const currencyKeys = Object.keys(
                      currencyConversionRate
                    ).sort();
                    for (const key of currencyKeys) {
                      if (key === toCurrencySymbol) {
                        container.push(
                          <option value={currencyConversionRate[key]} selected>
                            {key}
                          </option>
                        );
                      } else {
                        container.push(
                          <option value={currencyConversionRate[key]}>
                            {key}
                          </option>
                        );
                      }
                    }
                  }
                  return container;
                })()}
              </select>
            </span>
            <span>
              <input
                ref={toCurrencyInputRef}
                type="number"
                onChange={toValueChanged}
              />
            </span>
          </div>
        </div>
      )}
    </ContainWrapper>
  );
}
