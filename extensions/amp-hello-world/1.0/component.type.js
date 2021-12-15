/** @externs */

/** @const */
var BentoHelloWorldDef = {};

/**
 * @typedef {{
 *   exampleProperty: (string|undefined), (DO NOT SUBMIT)
 * }}
 */
BentoHelloWorldDef.Props;

/** @interface */
BentoHelloWorldDef.BentoHelloWorldApi = class {
  /** Example: API method to toggle the component */
  exampleToggle() {} // DO NOT SUBMIT
};
