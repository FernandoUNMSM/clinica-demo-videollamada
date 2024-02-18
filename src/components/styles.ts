import styled from "styled-components";

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


export const UserCameraOn = styled.div<{cameraoff: boolean, microphoneoff: boolean, isspeaking: boolean}>`
 position: relative;
 display: ${(props) => props.cameraoff ? 'none' : 'flex'};
 border-width: 8px;
 border-color:  ${(props) => props.microphoneoff ? '#FE4747' : props.isspeaking ? 'blue': '#4CAF50'};
  aspect-ratio: 16/9;
`

export const CircleButton = styled.button<{deviceOff?: boolean}>`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${(props) => props.deviceOff ? '#FE4747' : '#262424'};
  font-size: 20px;
  color: white;
`

export const LeaveButton = styled(CircleButton)`
  background-color: #FE4747;
`

export const MicrophoneOffIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  background-color: #fff;
  padding: 10px;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  right: 20px;
  top: 20px;
`