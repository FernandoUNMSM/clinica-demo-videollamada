import styled, {keyframes} from 'styled-components'

export const animation = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`

export const SpinContainer = styled.div`
  .spin {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: transparent;
    animation: ${animation} 1s infinite linear;
    margin-left: 20px;
  }
`

