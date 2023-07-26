import { useField } from "formik"

const CustomInput = ({label, ...props}) => {

  const [field, meta] = useField(props);
  console.log("field", field);
  console.log("meta", meta);

  return (
    <>
        <label>{ label}</label>
        <input {...props}/>
    </>

  )
}

export default CustomInput