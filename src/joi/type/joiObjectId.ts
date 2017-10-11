import * as joi from 'joi';

export const JoiObjectId = joi.string().trim().regex(/^[0-9a-fA-F]{24}$/);
