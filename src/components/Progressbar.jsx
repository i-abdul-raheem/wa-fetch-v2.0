import { ProgressBar } from "react-bootstrap";

export default function Progressbar(props) {
  return (
    <>
      <label htmlFor="1">{props.file_no}</label>
      <ProgressBar id="1" className="mb-2" now={props.progress} label={`${props.title}`} />
    </>
  );
}
