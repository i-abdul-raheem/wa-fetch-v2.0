export default (props) => {
  if (props.form.code === "") {
    props.setToastMsg("Country code is required.");
    props.setToast(true);
    return;
  }
  if (props.form.file === "") {
    props.setToastMsg("Please select a file.");
    props.setToast(true);
    return;
  }
  console.log(props);
  for (let i = 0; i <= 25; i++)
    setTimeout(() => {
      props.setCurrentProgress([...props.currentProgress, i * 4]);
    }, (i + 1) * 1000);
};
