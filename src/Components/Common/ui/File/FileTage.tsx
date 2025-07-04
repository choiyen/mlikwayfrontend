import { Label } from "@/SCSS/Fixed";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

interface SelectBoxProps {
  name: string;
  Value?: File[][]; // 2차원 배열
  Value2?: File;
  setBeforeValue?: Dispatch<SetStateAction<File[][]>>;
  setAfferValue?: Dispatch<SetStateAction<File[][]>>;
  setValue2?: Dispatch<SetStateAction<File>>; // 별도의 상태를 관리하는 함수
  index?: number;
  type?: "before" | "after"; // 타입 추가
}

const FileTageBox = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  opacity: 0;
`;

const CustomLabel = styled(Label)`
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 800px) {
    font-size: 15px; /* 모바일에서 폰트 크기 조정 */
  }
`;

interface CustomFileLabelProps {
  $hasFile: boolean;
}

const CustomFileLabel = styled.label<CustomFileLabelProps>`
  cursor: pointer;
  background-color: ${(props) => (props.$hasFile ? "green" : "#888")};
  width: 70%;
  height: 50px;
  color: white;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.$hasFile ? "darkgreen" : "brown")};
  }

  @media screen and (max-width: 800px) {
    width: 265px;
    height: 40px;
    font-size: 12px;
  }
`;

const FileContainer = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 10px;
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
`;

export const FileTage = ({
  name,
  Value,
  setBeforeValue,
  index,
  setValue2,
  setAfferValue,
  type,
}: SelectBoxProps) => {
  let inputId =
    index !== undefined ? `fileInput-${index}` : "fileInput-default";
  if (type === "before") {
    inputId = `fileInput-before-${index}`; // before 타입일 때 ID 설정
  }
  if (type === "after") {
    inputId = `fileInput-after-${index}`; // after 타입일 때 ID 설정
  } // 타입에 따라 ID 설정
  const width = useWindowWidth();
  const isMobile = width <= 600;
  const buttonText = isMobile
    ? "클릭 시 갤러리가 열립니다"
    : name + "에 해당하는 파일을 선택해주세요";
  const [hasFile, setHasFile] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // 선택한 파일들
    const FileArray: File[] = []; // 선택한 파일들을 1차원 배열로 유지
    FileArray.push(...files); // 파일을 2차원 배열로 변환

    if (setAfferValue && Value) {
      if (index !== undefined) {
        const updatedValue = [...Value];
        updatedValue[index] = FileArray;
        setAfferValue(updatedValue); // 부모 컴포넌트에 파일 상태 전달
        if (updatedValue.length > 0) {
          setHasFile(true);
        } else {
          setHasFile(false);
        }
      }
    } else if (setBeforeValue && Value) {
      if (index !== undefined) {
        const updatedValue = [...Value];
        updatedValue[index] = FileArray;
        setBeforeValue(updatedValue); // 부모 컴포넌트에 파일 상태 전달
        if (updatedValue.length > 0) {
          setHasFile(true);
        } else {
          setHasFile(false);
        }
      }
    } else {
      if (setValue2) {
        setValue2(files[0]); // 단일 파일을 설정
        if (files[0] != undefined) {
          setHasFile(true);
        } else {
          setHasFile(false);
        }
      }
    }
    // setValue2(FileArray); // 별도의 상태를 관리하는 함수 호출

    // 동일한 파일을 재선택할 수 있도록 값 초기화
    e.target.value = "";
  };

  return (
    <FileContainer>
      <CustomLabel>{name}</CustomLabel>
      <CustomFileLabel htmlFor={inputId} $hasFile={hasFile}>
        {buttonText}
      </CustomFileLabel>
      <FileTageBox
        type="file"
        id={inputId}
        {...(setValue2 == undefined ? { multiple: true } : {})}
        onChange={handleFileChange}
      />
    </FileContainer>
  );
};
