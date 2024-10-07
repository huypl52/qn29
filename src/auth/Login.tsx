import { useAuth } from "./context";
import { Card, CardContent, CardHeader, CardTitle } from "~/component/Card";
import { Input } from "~/component/Input";
import { ColorButton } from "~/component/Button";
import { Alert, AlertDescription } from "~/component/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthRoutePath } from "~/routes";
import { saveUser } from "~/storage/auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const result = await login(values.username, values.password);
      if (result) navigate(AuthRoutePath.DASHBOARD);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
              />
            </div>
            {formik.errors.username && (
              <Alert variant="destructive">
                <AlertDescription>{formik.errors.username}</AlertDescription>
              </Alert>
            )}
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
              />
            </div>
            {formik.errors.password && (
              <Alert variant="destructive">
                <AlertDescription>{formik.errors.password}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
              <ColorButton
                type="submit"
                className="w-full"
                active={
                  formik.values.password.length > 0 &&
                  formik.values.username.length > 0
                }
              >
                Xác nhận
              </ColorButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
