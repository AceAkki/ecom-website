interface InputElemProps {
  inputType: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholderTxt: string;
  classNameTxt: string;
}

const InputElem = ({
  inputType,
  placeholderTxt,
  classNameTxt,
}: InputElemProps) => {
  return (
    <input
      type={inputType}
      placeholder={placeholderTxt}
      className={classNameTxt}
    />
  );
};

export default InputElem;
