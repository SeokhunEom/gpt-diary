import { useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { Input, Button } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { Title } from "./CommonStyles";
import { MessageInstance } from "antd/es/message/interface";

const { TextArea } = Input;

interface DiaryInputProps {
  isLoading: boolean;
  onSubmit: (userInput: string) => void;
  messageApi: MessageInstance;
}

const DiaryInput = ({ isLoading, onSubmit, messageApi }: DiaryInputProps) => {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });

    onSubmit(userInput);
    setUserInput("");
  };

  const captureAndDownload = async () => {
    const nodeToCapture = document.getElementById("capture");
    console.log(nodeToCapture);
    html2canvas(nodeToCapture, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      const image = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = image;
      a.download = "gpt-diary-result.png";
      a.click();
    });
  };

  return (
    <div>
      <Title>오늘의 일;</Title>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          GPT 회고록을 작성해줘!
        </Button>
        <Button
          icon={<FileImageOutlined />}
          loading={isLoading}
          onClick={captureAndDownload}
        >
          저장
        </Button>
      </ButtonContainer>
      <canvas id="canvas" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
`;
