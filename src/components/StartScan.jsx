import { useEffect, useState } from "react";
import { Form, Row, Col, Table } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";
// import scanner from "./js/scanner";

export default function StartScan(props) {
  const [form, setForm] = useState({
    code: "",
    file: "",
    apis: [],
  });
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const deleteApi = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${props.token}`,
      },
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/api/${id}`,
      options
    ).then((res) => res.json());
    if (res.status === 200) {
      props.updateApis();
    }
    props.setToastMsg(res.message);
    props.setToast(true);
  };

  const addApiToForm = (url) => {
    if (!form.apis.includes(url))
      setForm({ ...form, apis: [...form.apis, url] });
    else {
      let myindex = -1;
      form.apis.map((i, index) => {
        if (i == url) {
          myindex = index;
        }
      });
      if (myindex != -1) {
        let myForm = form;
        myForm.apis.splice(myindex, 1);
        setForm(myForm);
      }
    }
  };

  useEffect(() => {
    props.setCurrentProgress(props.currentProgress);
  });

  const myRequestHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  const startScanner = async () => {
    if (form.code === "") {
      props.setToastMsg("Country code is required.");
      props.setToast(true);
      return;
    }
    if (form.file === "") {
      props.setToastMsg("Please select a file.");
      props.setToast(true);
      return;
    }
    if (form.apis.length < 1) {
      props.setToastMsg("Please select atleast 1 API");
      props.setToast(true);
      return;
    }
    props.hideScan();
    // OK

    const file = form.file;
    const code = form.code;
    const openFileOptions = {
      method: "POST",
      headers: myRequestHeaders,
      body: JSON.stringify({
        code: code,
        file: file,
      }),
    };
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/open/${file}`,
      openFileOptions
    ).then((res) => res.json());
    const searchData = response.message;
    const totalData = searchData.length;
    props.setCurrentProgressStatus(
      `${totalData} numbers already scanned`
    );
    const getResponse = async (api, num) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          fileName: file,
          phone: num,
          api: api,
        }),
      };
      const res = await fetch(
        `http://localhost:${process.env.REACT_APP_API}/scan`,
        options
      ).then((res) => res.json());
    };
    // OK CODE

    function transpose(arr) {
      const res = [];
      const totalRows = arr[0].length;
      for (let i = 0; i < totalRows; i++) {
        res.push([]);
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          res[j].push(arr[i][j]);
        }
      }
      return res;
    }

    const apiLenght = form.apis.length;
    const increment = Math.ceil(searchData.length / apiLenght);
    let next;
    let myRow = [];
    for (let i = 0; i < increment; i++) {
      if (apiLenght > searchData.length) next = searchData;
      else next = searchData.splice(0, apiLenght);
      myRow.push(next);
    }
    const transposeData = transpose(myRow);

    for (let j = 0; j < transposeData.length; j++) {
      transposeData[j].forEach(async (i, index) => {
        await sleep(4000 * (index + 1));
        console.log(form.apis[j], i);
        getResponse(form.apis[j], i);
        props.setCurrentProgressStatus(`/${totalData}`);
      });
    }
  };

  return (
    <>
      <ModalTemplate
        header="Start Scan"
        show={props.showScanState}
        onHide={props.hideScan}
        handleSubmit={() => {
          console.log(form);
          startScanner();
        }}
        actionTitle="Start"
      >
        <Form>
          <Row>
            <Col xs={3}>
              <Form.Group className="mb-3">
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  type="number"
                  placeholder="+1"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>Number List</Form.Label>
                <Form.Select
                  value={form.file}
                  onChange={(e) => setForm({ ...form, file: e.target.value })}
                  required
                >
                  <option value={""}>Select File...</option>
                  {props.files.map((i, index) => (
                    <option key={index} value={i.title}>
                      {i.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Select APIs</Form.Label>
                <Table responsive striped hover>
                  <tbody>
                    {props.apis.map((i, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Form.Check
                              onChange={() => {
                                addApiToForm(i.url);
                              }}
                              type={"checkbox"}
                              id={`api-${index}`}
                            />
                          </td>
                          <td style={{ color: "#fff" }}>
                            <label htmlFor={`api-${index}`}>{i.url}</label>
                          </td>
                          <td>
                            <i
                              onClick={() => deleteApi(i.id)}
                              className="text-danger fa fa-trash"
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
