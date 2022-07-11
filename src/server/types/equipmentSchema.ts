import Joi from "joi"
import DateExtension from '@joi/date'

const joi = Joi.extend(DateExtension)

export const equipmentSchema = joi.object()
  .keys({
    EquipmentNumber: joi.number().required(),
    Address: joi.string().max(100).required(),
    ContractStartDate: joi.date().format('YYYY-MM-DD').raw().required(),
    ContractEndDate: joi.date().format('YYYY-MM-DD').raw().required(),
    Status: joi.boolean().required(),
  })
