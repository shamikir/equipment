import axios, { AxiosError } from 'axios'
import { Equipment } from '../types/apitypes'

export const getEquipments = async (limit: string | null) => {
  const response = await axios.get(`/equipments?limit=${limit}`, {
    responseType: "json",
  })
  return response.data
}

export const getEquipment = async (id: number) => {
  const response = await axios.get(`/equipment/${id}`, {
    responseType: "json",
  })
  return response.data
}

export const postEquipment = async (equipment: Equipment) => {
  try {
    const response = await axios.post(`/equipment`, equipment)
    return response
  } catch(e) {
    const err = e as AxiosError
    return err.response
  }
}
