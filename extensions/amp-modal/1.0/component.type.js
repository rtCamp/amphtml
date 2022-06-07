/** @externs */

/** @const */
var BentoModelDef = {};

/**
 * @typedef {{
 *   title: (string),
 *   showAfter: (number|undefined),
 * }}
 */
BentoModelDef.Props;

/** @interface */
BentoModelDef.Api = class {
  /**
   * Displays model
   * @param {string|undefined} title
   * @param {PreactDef.Renderable|undefined} contents
   */
  showModel(title = null, contents = null) {}

  /** Hides model */
  hideModel() {}
};
