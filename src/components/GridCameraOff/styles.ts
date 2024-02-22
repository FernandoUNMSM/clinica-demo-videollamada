import styled from "styled-components"

export const UsersWithCameraOffContainer = styled.div`
  display: flex;
  justify-self: end;
  max-width: 900px;
  gap: 10px;
  padding: 10px 0;
  margin-right: 30px;
  overflow: auto;
  position: relative;
`

export const UserCameraOff = styled.div`
  height: 100%;
  width: 190px;
  background-color: transparent;
  border: 2px solid #afa;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(7px);
`

export const UserCircle = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 100px;
  background-color: #FFF;
  display: flex;
  justify-content:center;
  align-items: center;
  margin-bottom: 20px;
  p{
    position: absolute;
    bottom: 3px;
    color: #fff;
    left: 10px;
  }
`