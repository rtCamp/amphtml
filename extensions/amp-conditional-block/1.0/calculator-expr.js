import {calculatorParser as parser} from '#build/parsers/calculator-expr-impl';

/**
 * Evaluates access expressions.
 *
 * The grammar is defined in the `access-expr-impl.jison` and compiled using
 * (Jison)[https://zaach.github.io/jison/] parser. The compilation steps are
 * built into the `amp build` and `amp dist` tasks.
 *
 * Grammar highlights:
 * - Shorthand truthy expressions are allowed, such as `field`. Truthy value
 *   is defined as `X !== null && X !== '' && X !== 0 && X !== false`.
 * - Basic equality expressions: `X = 1`, `X = true`, `X = "A"`. And also,
 *   non-equality: `X != 1` and so on.
 * - Basic comparison expressions only defined for numbers: `X < 1`,
 *   `X >= 10`.
 * - Boolean logic: `X = 1 OR Y = 1`, `X = 1 AND Y = 2`, `NOT X`, `NOT (X = 1)`.
 *
 * @param {string} expr
 * @param {!JsonObject} data
 * @return {boolean}
 */
export function evaluateCalculatorExpr(expr, data) {
  try {
    parser.yy = data;
    return parser.parse(expr);
  } finally {
    parser.yy = null;
  }
}

/**
 * AccessExpressionProcessor calculates bento-access expressions.
 * It uses a cache to speed up repeated evals for the same expression.
 */
export class AccessExpressionProcessor {
  /** */
  constructor() {
    // /** @type {Object<string, boolean>} */
    // this.cache = null;
    // /** @private @type {JsonObject} */
    // this.lastData_ = null;
  }

  /**
   * Compute access expressions.
   *
   * @param {string} expr
   * @param {!JsonObject} data
   * @return {string}
   */
  evaluate(expr, data) {
    // if (this.lastData_ !== data) {
    //   this.lastData_ = data;
    //   this.cache = map();
    // }

    //if (!hasOwn(this.cache, expr)) {
    //this.cache[expr] = evaluateCalculatorExpr(expr, data);
    //}

    //return this.cache[expr];

    if (expr === 'true') {
      return true;
    } else if (expr === 'false') {
      return false;
    }

    return evaluateCalculatorExpr(expr, data);
  }
}
