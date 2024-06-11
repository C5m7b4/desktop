import ReactDOM from "react-dom";
import { IValue } from "../dropTargets/Values";
import {
  Body,
  Overlay,
  Wrapper,
  Modal,
  Header,
  Title,
  CloseBox,
  CloseButton,
  Buttons,
} from "./divs";
import Button from "../../Button";
import Input from "../../Input";
import { ChangeEvent } from "react";

interface Props {
  isShowing: boolean;
  hide: () => void;
  title: string;
  column: IValue;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  confirm: () => void;
}

function AliasModal(props: Props) {
  const { isShowing, hide, title, column, value, onChange, confirm } = props;

  return (
    <>
      {isShowing
        ? ReactDOM.createPortal(
            <>
              <Overlay />
              <Wrapper>
                <Modal>
                  <Header>
                    <Title>{title}</Title>
                    <CloseBox>
                      <CloseButton onClick={hide}>
                        <span>&times;</span>
                      </CloseButton>
                    </CloseBox>
                  </Header>
                  <Body>
                    <p>Set an alias for {column.label}</p>
                    <Input value={value} onChange={onChange} />
                    <Buttons>
                      <Button label="Cancel" type="warning" onClick={hide} />
                      <Button label="OK" type="normal" onClick={confirm} />
                    </Buttons>
                  </Body>
                </Modal>
              </Wrapper>
            </>,
            document.body
          )
        : null}
    </>
  );
}

export default AliasModal;
