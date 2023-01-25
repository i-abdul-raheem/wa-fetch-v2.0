import "./App.css";
import StartScan from "./components/StartScan";
import UploadFile from "./components/UploadFile";
import ExportFile from "./components/ExportFile";
import AddAPI from "./components/AddAPI";
import { useReducer, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";

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
  if (token !== "")
    return (
      <>
        <Dashboard
          scanShow={() => dispatch({ id: "scan", type: "on" })}
          uploadShow={() => dispatch({ id: "upload", type: "on" })}
          exportShow={() => dispatch({ id: "export", type: "on" })}
          apiShow={() => dispatch({ id: "api", type: "on" })}
          passwordShow={() => dispatch({ id: "password", type: "on" })}
        />
        <StartScan
          showScan={() => dispatch({ id: "scan", type: "on" })}
          hideScan={() => dispatch({ id: "scan", type: "off" })}
          showScanState={state[0].status}
        />
        <UploadFile
          showUploadFile={() => dispatch({ id: "upload", type: "on" })}
          hideUploadFile={() => dispatch({ id: "upload", type: "off" })}
          showUploadFileState={state[1].status}
        />
        <ExportFile
          showExportFile={() => dispatch({ id: "export", type: "on" })}
          hideExportFile={() => dispatch({ id: "export", type: "off" })}
          showExportFileState={state[2].status}
        />
        <AddAPI
          showAddAPI={() => dispatch({ id: "api", type: "on" })}
          hideAddAPI={() => dispatch({ id: "api", type: "off" })}
          showAddAPIState={state[3].status}
        />
        <ChangePassword
          showChangePassword={() => dispatch({ id: "password", type: "on" })}
          hideChangePassword={() => dispatch({ id: "password", type: "off" })}
          showChangePasswordState={state[4].status}
        />
      </>
    );
  else return <Login />;
}

export default App;
