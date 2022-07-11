import AWS from 'aws-sdk'

import { EquipmentRecord } from './types/dbtypes'

const dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})
const equipmentsTable = 'Equipment'

export const EQUIPMENT_ATTRIBUTES = {
  id: "EquipmentNumber",
  address: "Address",
  contractStartDate: "ContractStartDate",
  contractEndDate: "ContractEndDate",
  status: "Status"
}

export const getEquipments = async (limit: number | undefined): Promise<EquipmentRecord[]> => {
  const data = await dynamo.scan({
    TableName: equipmentsTable,
    Limit: limit,
  }).promise()
  return data.Items ? (data.Items as EquipmentRecord[]) : []
}

export const getEquipment = async (id: number): Promise<EquipmentRecord | null> => {
  const result = await dynamo.get({
    TableName: equipmentsTable,
    Key: {
      [EQUIPMENT_ATTRIBUTES.id]: id, 
    },
  }).promise()
  return result ? (result.Item as EquipmentRecord) : null
}

export const postEquipment = async (item: EquipmentRecord): Promise<any> => {
  return await dynamo.put({
    TableName: equipmentsTable,
    Item: {
      [EQUIPMENT_ATTRIBUTES.id]: item.EquipmentNumber,
      [EQUIPMENT_ATTRIBUTES.address]: item.Address,
      [EQUIPMENT_ATTRIBUTES.contractStartDate]: item.ContractStartDate,
      [EQUIPMENT_ATTRIBUTES.contractEndDate]: item.ContractEndDate,
      [EQUIPMENT_ATTRIBUTES.status]: item.Status,
    },
    ConditionExpression: "EquipmentNumber <> :id",
    ExpressionAttributeValues: {
      ":id" : item.EquipmentNumber
  }
  }).promise()
}
