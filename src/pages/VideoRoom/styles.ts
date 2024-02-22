import styled from "styled-components";

export const VideoRoomContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 100px;
  gap: 4px;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.videoRoom.background};
  /* background-image: url('https://img.freepik.com/vector-gratis/floral-flores-cerezo-plena-floracion-rosa_8130-710.jpg?w=1380&t=st=1708472910~exp=1708473510~hmac=1496488fba91c5bef02361ab387684eecea4b0a6e56dd65201a0b806ff3e13b6'); */
  /* background-image: url('https://img.freepik.com/premium-photo/cherry-blossom-floral-abstract-springtime-japan-with-vibrant-sakura-flower-background-generative-ai_58409-34270.jpg?w=1380'); */
  /* background-size: cover; */
  /* background-image: linear-gradient(to bottom, #0496c1, #0065ab); */
`

export const ControlButtonsContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`


export const CircleButton = styled.button<{deviceOff?: boolean}>`
  height: 60px;
  width: 60px;
  display: flex;
  transition: .3s;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  /* background-color: ${(props) => props.deviceOff ? '#FE4747' : '#262424'};
  &:hover{
    background-color: ${(props) => props.deviceOff ? '#e62e2e' : '#333030'};;
  } */
  background-color: ${(props) => props.deviceOff ? props.theme.circleButton.off : props.theme.circleButton.on};
  &:hover{
    background-color: ${(props) => props.deviceOff ? props.theme.circleButton.offHover : props.theme.circleButton.onHover};;
  }


  font-size: 20px;
  color: white;
`

export const LeaveButton = styled(CircleButton)`
  background-color: ${(props) => props.theme.circleButton.off };
  &:hover{
    background-color: ${(props) => props.theme.circleButton.offHover};
  }
`