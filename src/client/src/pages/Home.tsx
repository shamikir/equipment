import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, TabRow, TabColumn, EquipmentRow, EquipmentItem, StatusIcon, SearchWrapper, Search,
  Input, Submit, Button, Error, Modal, InputRow, Label, AddInput, ButtonsRow } from '../components/components'

import { getEquipments, getEquipment, postEquipment } from '../api/equipmentApi'
import { Equipment } from '../types/apitypes'

export const Home = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  let [searchParams] = useSearchParams()
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [getEquipmentById, setEquipmentById] = useState<number | "">("")
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if (getEquipmentById === "") {
      fetchData()
    } else {
      fetchEquipmentById()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEquipmentById, update])

  const fetchData = async () => {
    try {
      const equipmentsArray = await getEquipments(searchParams.get('limit'))
      setEquipments(equipmentsArray.sort((a: Equipment, b: Equipment) => a.EquipmentNumber - b.EquipmentNumber))
    } catch (e) {

    }
  }

  const fetchEquipmentById = async () => {
    try {
      const equipment = await getEquipment(getEquipmentById as number)
      setEquipments(equipment && Array(equipment))
    } catch (e) {

    }
  }

  const addEquipment = async (equipment: Equipment) => {
    try {
      const resp = await postEquipment(equipment)
      if (resp?.status === 201) {
        reset()
        setShowModal(!showModal)
        setUpdate(!update)
      } else {
        setErrorMessage(resp?.data)
      }
    } catch (e) {

    }
  }

  return (
    <Container>
      <SearchWrapper>
        <Search>
          <Input type="number" placeholder='Equipment Number' {...register("equipmentId")} />
          <Submit onClick={handleSubmit((input) => setEquipmentById(input.equipmentId))}>Search</Submit>
        </Search>
        <Button onClick={() => setShowModal(!showModal)}>Add Equipment</Button>
      </SearchWrapper>
      {showModal &&
        <Modal>
          <InputRow>
            <Label>Equipment Number: </Label>
            <AddInput type="number" {...register("EquipmentNumber", {
              required: { 
                value: true,
                message: "Field is required"
              },
              valueAsNumber: true,
            })} placeholder={errors?.equipmentNumber?.message as (string | undefined)} />
          </InputRow>
          <InputRow>
            <Label>Address: </Label>
            <AddInput type="text" {...register("Address",
              { required: { value: true, message: "Field is required" } })} placeholder={errors?.address?.message as (string | undefined)} />
          </InputRow>
          <InputRow>
            <Label>Contract Start Date: </Label>
            <AddInput type="text" {...register("ContractStartDate",
              { required: { value: true, message: "Field is required" } })} placeholder={errors?.startDate?.message as (string | undefined)} />
          </InputRow>
          <InputRow>
            <Label>Contract Etart Date: </Label>
            <AddInput type="text" {...register("ContractEndDate",
              { required: { value: true, message: "Field is required" } })} placeholder={errors?.endDate?.message as (string | undefined)} />
          </InputRow>
          <InputRow>
            <Label>Status: </Label>
            <AddInput type="checkbox" {...register("Status")} />
          </InputRow>
          <Error>
            {errorMessage}
          </Error>
          <ButtonsRow>
            <Button onClick={handleSubmit((input) => {
              delete input.equipmentId
              addEquipment(input as Equipment)
            })}>Add</Button>
            <Button onClick={() => {
              reset()
              setShowModal(!showModal)
            }}>Close</Button>
          </ButtonsRow>
        </Modal>
      }
      <TabRow>
        <TabColumn>Equipment Number</TabColumn>
        <TabColumn>Address</TabColumn>
        <TabColumn>Contract Start Date</TabColumn>
        <TabColumn>Contract End Date</TabColumn>
        <TabColumn>Status</TabColumn>
      </TabRow>
      {equipments.length > 0 ?
        equipments?.map((equipment: Equipment) => (
          <EquipmentRow key={equipment.EquipmentNumber} to={'/'}>
            <EquipmentItem>{equipment.EquipmentNumber}</EquipmentItem>
            <EquipmentItem>{equipment.Address}</EquipmentItem>
            <EquipmentItem>{equipment.ContractStartDate}</EquipmentItem>
            <EquipmentItem>{equipment.ContractEndDate}</EquipmentItem>
            <EquipmentItem><StatusIcon status={equipment.Status} /></EquipmentItem>
          </EquipmentRow>
        )) : getEquipmentById !== "" ?
        <Error>
          No Equipments Found
        </Error> : <></>
      }
    </Container>
  )
}
