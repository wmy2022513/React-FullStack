import {useField} from "formik";

const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  // console.log("meta", meta);

  return (
    <>
      <label>{label}</label>
      <select
      {...field}
      {...props}
      />
      
    </>
  );
};

export default CustomSelect;
