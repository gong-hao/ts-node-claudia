export interface ITodo {
  /**
   * ID
   *
   * @type {string}
   * @memberof ITodo
   */
  _id?: string;
  /**
   * Title of todo
   *
   * @type {string}
   * @memberof ITodo
   */
  Title?: string;
  /**
   * Done flag
   *
   * @type {boolean}
   * @memberof ITodo
   */
  Done?: boolean;
  /**
   * Create Date
   *
   * @type {Date}
   * @memberof ITodo
   */
  CreateOn?: Date;
  /**
   * Done Date
   *
   * @type {Date}
   * @memberof ITodo
   */
  DoneOn?: Date;
}
