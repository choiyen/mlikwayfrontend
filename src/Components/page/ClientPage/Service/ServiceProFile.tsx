import { useEffect, useRef, useState } from "react";
import { GET } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { Introduction, IntroductionService } from "./Type/IntroductionService";

import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import { Notice, SelectType } from "./Component/type";
import ServiceSelector from "./Component/ServiceSelector";
import IntroductionDetail from "./Component/IntroductionDetail";
import EmptyReview from "./Component/EmptyReview";
import ReviewCards from "./Component/ReviewCards";
import { PageNavigator } from "../Question/page/ui/PageNavigator";
import { useSearchParams } from "react-router-dom";
import { ReviewBanner } from "./Component/ReviewBanner";
const Fontname2 = styled.div`
  color: ${theme.colors.charcoalBlack};
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: bolder;

  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
`;
const FontComment = styled.div`
  font-size: 20px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const ServiceProFile = () => {
  const [selectIntroduction, setIntroduction] = useState<Introduction[]>();
  const [notices, setNotice] = useState<Notice[]>();
  const TotalPage = useRef(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [select, setSelect] = useState<SelectType>(type ?? "전체보기");
  const [CurrentPage, setCurrentPage] = useState<number>();
  const fetchType = async (type: string, CurrentPage: number) => {
    if (type === "전체보기") {
      return await GET({
        url: paths.Notice.serach.path + "/page",
        params: { page: CurrentPage },
      });
    } else {
      return await GET({
        url: paths.Notice.Type.path,
        params: { type: type, page: CurrentPage },
      });
    }
  };
  useEffect(() => {
    setSearchParams({
      type: select,
    });
  }, [select]);

  useEffect(() => {
    fetchType(select, CurrentPage ?? 0)
      .then((res) => {
        if (res.resultType == "empty") {
          setNotice([]);
          return;
        }
        setNotice(res.pageDTO.list);
        TotalPage.current = res.pageDTO.pageCount;
      })
      .catch(() => {
        setNotice([]);
      });
    setIntroduction(IntroductionService.filter((s) => s.Service === select));
  }, [select, CurrentPage]);

  return (
    <div
      style={{
        backgroundColor: "#f9f6f1",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Fontname2>
          <span style={{ color: "#c88b6f" }}>가족처럼 </span>
          포근하고
          <span style={{ color: "#609ea2" }}> 기계처럼 </span>
          꼼꼼한 Care Service
        </Fontname2>
        <FontComment>
          은하수 홈케어의 차별화된 청소 서비스를 한번 경험해보세요!
        </FontComment>
      </div>
      <ServiceSelector setSelect={setSelect} />
      <div style={{ backgroundColor: "#F0F4F8", width: "100%" }}>
        {selectIntroduction?.map((intro, idx) => (
          <div key={idx}>
            <IntroductionDetail data={intro} />
            <ReviewBanner />
            {notices && notices.length > 0 ? (
              <div>
                <ReviewCards notices={notices} />
                <PageNavigator
                  CurrentPage={CurrentPage ?? 0}
                  setCurrentPage={setCurrentPage}
                  TotalPage={TotalPage}
                />
              </div>
            ) : (
              <EmptyReview />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProFile;
