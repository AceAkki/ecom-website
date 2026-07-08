import { Form } from "react-router-dom";
import "./loginPage.css";
import modelImg from "../../assets/model-girl-12-sqr.png";

export const action = ({ formData }: { formData: any }) => {
  console.log(formData);
  return formData;
};

const Login = () => {
  return (
    <section className="login-section">
      <div className="form-wrap">
        <h2 className="text-4xl font-thin">Login</h2>
        <Form action="post">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button className="home-page-btn"> Login </button>
        </Form>
      </div>
      <div className="img-wrap">
        <img src={modelImg} alt="" />
      </div>
    </section>
  );
};

export default Login;
