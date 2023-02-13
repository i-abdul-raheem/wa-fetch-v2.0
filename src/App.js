import "./App.css";
import StartScan from "./components/StartScan";
import UploadFile from "./components/UploadFile";
import ExportFile from "./components/ExportFile";
import AddAPI from "./components/AddAPI";
import { useEffect, useReducer, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import { Toast, ToastContainer } from "react-bootstrap";

function App() {
  const myStates = [
    { id: "scan", status: false },
    { id: "upload", status: false },
    { id: "export", status: false },
    { id: "api", status: false },
    { id: "password", status: false },
  ];
  const reducer = (state, action) => {
    switch (action.type) {
      case "on":
        return state.map((i) => {
          if (i.id === action.id) {
            i.status = true;
          }
          return i;
        });
      case "off":
        return state.map((i) => {
          if (i.id === action.id) {
            i.status = false;
          }
          return i;
        });
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducer, myStates);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [inProgress, setInProgress] = useState("");
  const [currentProgress, setCurrentProgress] = useState(100);
  const [currentProgressTitle, setCurrentProgressTitle] = useState("Free Slot");
  const [currentProgressStatus, setCurrentProgressStatus] =
    useState("Not Initialized");

  // Set Files
  const [files, setFiles] = useState([]);
  const updateFiles = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/file`,
      options
    ).then((res) => res.json());
    setFiles(res.data);
  };
  useEffect(() => {
    if (token !== "") updateFiles();
  }, [token]);

  // Set APIs
  const [apis, setApis] = useState([]);
  const [toast, setToast] = useState(true);
  const [toastMsg, setToastMsg] = useState("Welcome to WA-FETCH v2.0");

  const updateApis = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/api`,
      options
    ).then((res) => res.json());
    setApis(res.data);
  };

  useEffect(() => {
    if (token !== "") updateApis();
  }, [token]);

  if (token !== "")
    return (
      <>
        <Dashboard
          scanShow={() => dispatch({ id: "scan", type: "on" })}
          uploadShow={() => dispatch({ id: "upload", type: "on" })}
          exportShow={() => dispatch({ id: "export", type: "on" })}
          apiShow={() => dispatch({ id: "api", type: "on" })}
          passwordShow={() => dispatch({ id: "password", type: "on" })}
          username={username}
          token={token}
          setUsername={setUsername}
          setToken={setToken}
          files={files}
          inProgress={inProgress}
          currentProgress={currentProgress}
          currentProgressTitle={currentProgressTitle}
          currentProgressStatus={currentProgressStatus}
          setToast={setToast}
          setToastMsg={setToastMsg}
          updateFiles={updateFiles}
        />
        <StartScan
          showScan={() => dispatch({ id: "scan", type: "on" })}
          hideScan={() => dispatch({ id: "scan", type: "off" })}
          showScanState={state[0].status}
          token={token}
          apis={apis}
          updateApis={updateApis}
          setToast={setToast}
          setToastMsg={setToastMsg}
          files={files}
          setInProgress={setInProgress} // Change
          inProgress={inProgress} // Total files in progress
          currentProgress={currentProgress} // [100, 100, 100]
          setCurrentProgress={setCurrentProgress}
          currentProgressTitle={currentProgressTitle} // File Titles ['S', 'S', 'S']
          setCurrentProgressTitle={setCurrentProgressTitle}
          setCurrentProgressStatus={setCurrentProgressStatus}
          currentProgressStatus={currentProgressStatus}
        />
        <UploadFile
          showUploadFile={() => dispatch({ id: "upload", type: "on" })}
          hideUploadFile={() => dispatch({ id: "upload", type: "off" })}
          showUploadFileState={state[1].status}
          token={token}
          updateFiles={updateFiles}
          setToast={setToast}
          setToastMsg={setToastMsg}
        />
        <ExportFile
          showExportFile={() => dispatch({ id: "export", type: "on" })}
          hideExportFile={() => dispatch({ id: "export", type: "off" })}
          showExportFileState={state[2].status}
          files={files}
          token={token}
        />
        <AddAPI
          showAddAPI={() => dispatch({ id: "api", type: "on" })}
          hideAddAPI={() => dispatch({ id: "api", type: "off" })}
          showAddAPIState={state[3].status}
          token={token}
          apis={apis}
          setApis={setApis}
          updateApis={updateApis}
          setToast={setToast}
          setToastMsg={setToastMsg}
        />
        <ChangePassword
          showChangePassword={() => dispatch({ id: "password", type: "on" })}
          hideChangePassword={() => dispatch({ id: "password", type: "off" })}
          showChangePasswordState={state[4].status}
          username={username}
          token={token}
          setToast={setToast}
          setToastMsg={setToastMsg}
        />
        <ToastContainer className="p-3" position={"bottom-end"}>
          <Toast
            bg="dark"
            onClose={() => setToast(false)}
            show={toast}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">System</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body className="text-white">{toastMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  else return <Login setToken={setToken} setUsername={setUsername} />;
}

export default App;
