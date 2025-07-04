import { ManagerCommonPage } from "@/Components/Common/layouts/ManagerComonPage";
import "./App.css";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ManagerAddress } from "@/Components/page/ManagerPage/Address/Components/ManagerAddress";
import {
  ClientGateWayType,
  ManagerGateWayType,
} from "@/types/GateWay/GateWayType";
import { ManagerAdvice } from "@/Components/page/ManagerPage/Advice/ManagerAdvice";
import { ManagerAdviceSelect } from "@/Components/page/ManagerPage/Advice/ManagerAdviceSelect";
import { ManagerMain } from "@/Components/page/ManagerPage/Connected/ManagerMain";
import { ManagerJoin } from "@/Components/page/ManagerPage/Address/Components/ManagerJoin";
import ManagerAdviceedit from "@/Components/page/ManagerPage/Advice/ManagerAdviceedit";
import { ManagerCalendar } from "@/Components/page/ManagerPage/Calendar/Components/ManagerCalendar";
import { ManagerNotFoundPage } from "@/Components/page/ManagerPage/NotFound/ManagerNotFoundPage";
import { ManagerSignUp } from "@/Components/page/ManagerPage/Connected/ManagerSignUp";
import { ManagerQuestion } from "@/Components/page/ManagerPage/Question/ManagerQuestion";
import { ManagerQuestionSelect } from "@/Components/page/ManagerPage/Question/ManagerQuestionSelect";
import store from "@/config/reduxstore";
import GlobalErrorBoundary from "@/Components/Common/errors/GlobalErrorBoundary";
import { ClientComonPage } from "@/Components/Common/layouts/ClientComonPage";
import { MainPage } from "@/Components/page/ClientPage/Main/MainPage";
import ServiceProFile from "@/Components/page/ClientPage/Service/ServiceProFile";
import ServiceIntroduction from "@/Components/page/ClientPage/Introduction/ServiceIntroduction";
import { ClientQuestion } from "@/Components/page/ClientPage/Question/page/ClientQuestion";
import ServiceInsert from "@/Components/page/ClientPage/Question/Board/ServiceInsert";
import ServiceBoard from "@/Components/page/ClientPage/Question/Board/ServiceBoard";
import { ClientReservation } from "@/Components/page/ClientPage/Reservation/ClientReservation";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "@/SCSS/typecss";
import { GlobalSwalStyle } from "./AppToast";
import ManagerInquires from "@/Components/page/ManagerPage/Inquires/ManagerInquires";
import { ToastContainer } from "react-toastify";
import ManagerInquiresSelect from "@/Components/page/ManagerPage/Inquires/ManagerInquiresSelect";
import ServiceDetail from "@/Components/page/ClientPage/Service/ServiceDetail";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { HelmetProvider } from "react-helmet-async";
import ManagerFind from "@/Components/page/ManagerPage/Connected/ManagerFind";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Client/home" replace />,
  },
  {
    path: "/Manager",
    element: <ManagerCommonPage />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: ManagerGateWayType.Address,
        element: <ManagerAddress />,
      },
      {
        path: ManagerGateWayType.Advice,
        element: <ManagerAdvice />,
      },
      {
        path: ManagerGateWayType.AdviceSelect,
        element: <ManagerAdviceSelect />,
      },
      {
        path: ManagerGateWayType.Main,
        element: <ManagerMain />,
      },
      {
        path: ManagerGateWayType.QuestionSelect,
        element: <ManagerQuestionSelect />,
      },
      {
        path: ManagerGateWayType.Question,
        element: <ManagerQuestion />,
      },
      {
        path: ManagerGateWayType.Join,
        element: <ManagerJoin />,
      },
      {
        path: ManagerGateWayType.SignUp,
        element: <ManagerSignUp />,
      },
      {
        path: ManagerGateWayType.Calendar,
        element: <ManagerCalendar />,
      },
      {
        path: ManagerGateWayType.Adviceedit,
        element: <ManagerAdviceedit />,
      },
      {
        path: ManagerGateWayType.Inquires,
        element: <ManagerInquires />, // Assuming this is the correct component for Inquires
      },
      {
        path: ManagerGateWayType.ManagerFind,
        element: <ManagerFind />, // Assuming this is the correct component for Manager Find
      },
      {
        path: ManagerGateWayType.Inquireedit,
        element: <ManagerInquiresSelect />, // Assuming this is the correct component for Inquire edit
      },
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: "/Client",
    element: <ClientComonPage />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: ClientGateWayType.home,
        element: <MainPage />,
      },
      {
        path: ClientGateWayType.Reservation,
        element: <ClientReservation />,
      },
      {
        path: ClientGateWayType.Info,
        element: <ServiceIntroduction />,
      },
      {
        path: ClientGateWayType.Service,
        element: <ServiceProFile />,
      },
      {
        path: ClientGateWayType.Question,
        element: <ClientQuestion />,
      },
      {
        path: ClientGateWayType.Boardedit,
        element: <ServiceBoard />,
      },
      {
        path: ClientGateWayType.ServiceInsert,
        element: <ServiceInsert />,
      },
      {
        path: ClientGateWayType.ServiceDetail,
        element: <ServiceDetail />, // Assuming this is the correct component for Service Detail
      },
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ManagerCommonPage />,
    children: [
      {
        path: "*",
        element: <ManagerNotFoundPage />,
      },
    ],
  }, // 클라이언트 쪽 페이지로 변경되어 함
]);

const GlobalStyle = createGlobalStyle`
  body, body * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input, textarea, select, [contenteditable="true"] {
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
  }
`;
const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-H80BE2F7QS"); // Replace with your actual GA4 Measurement ID
    ReactGA.send("pageview");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HelmetProvider>
          <GlobalSwalStyle /> {/* 여기 넣기 */}
          <GlobalStyle />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            toastClassName="custom-toast"
            className="custom-toast-body"
          />
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
