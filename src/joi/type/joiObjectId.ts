import * as joi from 'joi';

export const JoiObjectID = joi.string().trim().regex(/^[0-9a-fA-F]{24}$/);
