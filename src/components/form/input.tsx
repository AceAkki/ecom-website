interface elemTypes {
  inputType: string;
  placeholderTxt: string;
  classNameTxt: string;
}

const inputElem = ({ inputType, placeholderTxt, classNameTxt }: elemTypes) => {
  return (
    <input
      type={inputType}
      placeholder={placeholderTxt}
      className={classNameTxt}
    />
  );
};

export default inputElem;
