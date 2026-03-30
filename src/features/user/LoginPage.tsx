import { Form } from "react-router-dom";

export const action = ({ formData }: { formData: any }) => {
  console.log(formData);
  return formData;
};

const Login = () => {
  return (
    <section>
      <h1>Login</h1>
      <Form action="post">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button> Login </button>
      </Form>
    </section>
  );
};

export default Login;
