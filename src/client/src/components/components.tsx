import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface StatusIconProps {
  status: boolean,
}

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  letter-spacing: 1px;
`

export const Logo = styled.div`
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/KONE.svg/640px-KONE.svg.png');
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: drop-shadow(2px 4px 6px black);
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98vw;
  margin: 0px auto;
  box-shadow: 0px 0px 8px white;
  min-height: calc(100vh - 90px);
  box-sizing: border-box;
  padding: 10px;
`

export const TabRow = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background: #007ec7;
  color: white;
  font-weight: 600;
  padding: 20px;
  box-sizing: border-box;
`

export const TabColumn = styled.div`
  display: flex;
  width: calc(100% / 5);
`

export const EquipmentRow = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 1200px;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;
  transition: all 100ms ease-in-out;

  :nth-child(odd) {
    background-color: #007ec730;
  }

  :hover {
    color: white;
    box-shadow: 0px 0px 2px white;
    background-color: #007ec7;
  }
`

export const EquipmentItem = styled.div`
  width: calc(100% / 5);
  color: black;
`

export const StatusIcon = styled.div<StatusIconProps>`
  background-color:  ${props => props.status ? '#26e726' : '#ff4343'};
  width: 30px;
  height: 30px;
  border-radius: 100%;
`

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
`

export const Search = styled.div`
  display: flex;

`

export const Input = styled.input`
  min-height: 20px;
  padding: 20px 40px;
  font-weight: 600;
  border-radius: 12px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: 2px solid #007ec7;
`

export const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  padding: 20px 40px;
  cursor: pointer;
  background: #007ec7;
  color: white;
  border: 2px solid #007ec7;
  border-radius: 12px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  transition: 250ms ease-in-out;
  border-left-color: white;

  :hover {
    color: black;
    background-color: white;
  }
`

export const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 20px;
min-width: 100px;
padding: 20px 40px;
cursor: pointer;
background: #007ec7;
color: white;
border: 2px solid #007ec7;
border-radius: 12px;
transition: 250ms ease-in-out;
margin-left: 40px;

:hover {
  color: black;
  background-color: white;
}
`

export const Error = styled.div`
  color: red;
`

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  max-width: 1200px;
`

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  max-width: 800px;
  width: 100%;
  margin-bottom: 20px;
`

export const Label = styled.div`
  display: flex;
  align-items: center;
`

export const AddInput = styled.input`
  min-height: 20px;
  padding: 20px 40px;
  font-weight: 600;
  border: 0;
  border-bottom: 2px solid #007ec7;

  ::placeholder {
    color: red;
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
`