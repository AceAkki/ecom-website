import { Form } from "react-router-dom";
const Login = () => {
  return (
    <section>
      <h1>Login</h1>
      <Form>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button> Login </button>
      </Form>
    </section>
  );
};

export default Login;
