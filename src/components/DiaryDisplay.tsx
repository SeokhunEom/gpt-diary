import {
  LoadingOutlined,
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
  MessageTwoTone,
  SoundTwoTone,
} from "@ant-design/icons";
import { Image } from "antd";
import styled from "styled-components";

import {
  DiaryContainer,
  ResultTitle,
  Divider,
  CardContainer,
  CardTitle,
  CardContent,
  ActionListItem,
} from "./CommonStyles";

interface DiaryDisplayProps {
  data: {
    title: string;
    thumbnail: string;
    summary: string;
    emotional_content: string;
    emotional_result: string;
    analysis: string;
    action_list: string[];
  };
  isLoading: boolean;
}

const DiaryDisplay = ({ data, isLoading }: DiaryDisplayProps) => {
  return (
    <DiaryContainer>
      {isLoading && (
        <>
          불러오는중...
          <LoadingOutlined />
        </>
      )}
      <ResultTitle>{data.title}</ResultTitle>

      <Divider />
      <CardContainer>
        <CardTitle>
          <CheckCircleTwoTone
            twoToneColor="#FF9AA2"
            style={{ marginRight: "6px" }}
          />
          요약
        </CardTitle>
        <CardContent>{data.summary}</CardContent>
      </CardContainer>

      <ThumbnailImage src={data.thumbnail} alt="Thumbnail" />

      <Divider />
      <CardContainer>
        <CardTitle>
          <HeartTwoTone twoToneColor="#FFB7B2" style={{ marginRight: "6px" }} />
          감성일기장
        </CardTitle>
        <CardContent>{data.emotional_content}</CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SmileTwoTone twoToneColor="#FFDAC1" style={{ marginRight: "6px" }} />
          내가 느낀 감정
        </CardTitle>
        <CardContent>{data.emotional_result}</CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <MessageTwoTone
            twoToneColor={"#B5EAD7"}
            style={{ marginRight: "6px" }}
          />
          심리 분석
        </CardTitle>
        <CardContent>{data.analysis}</CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SoundTwoTone twoToneColor="#C7CEEA" style={{ marginRight: "6px" }} />
          GPT 조언
        </CardTitle>
        <CardContent>
          {data.action_list.map((action, index) => (
            <ActionListItem key={index}>{action}</ActionListItem>
          ))}
        </CardContent>
      </CardContainer>
    </DiaryContainer>
  );
};

export default DiaryDisplay;

const ThumbnailImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;
