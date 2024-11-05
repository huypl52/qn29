import { useAuth } from './context';
import { Card, CardContent, CardHeader, CardTitle } from '~/component/Card';
import { Input } from '~/component/Input';
import { ColorButton } from '~/component/Button';
import { Alert, AlertDescription } from '~/component/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthRoutePath } from '~/routes';
import { saveUser } from '~/storage/auth';
import loginImage from '../assets/login.jpg';
import ColorLoginButton from '~/component/Button/ColorLoginButton';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const result = await login(values.username, values.password);
      if (result) navigate(AuthRoutePath.TRANSLATE);
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <Card className="w-[450px] bg-white rounded-lg shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-center font-bold text-xl">
            Đăng nhập hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Tên đăng nhập"
                value={formik.values.username}
                onChange={(e) =>
                  formik.setFieldValue('username', e.target.value)
                }
                className={formik.errors.username ? 'border-red-500' : ''}
              />
            </div>
            {/* <div className="h-[5vh]"> */}
            {/*   {formik.errors.username && ( */}
            {/*     <Alert variant="destructive"> */}
            {/*       <AlertDescription>{formik.errors.username}</AlertDescription> */}
            {/*     </Alert> */}
            {/*   )} */}
            {/* </div> */}
            <div className="mt-4">
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue('password', e.target.value)
                }
                className={formik.errors.password ? 'border-red-500' : ''}
              />
            </div>
            {/* <div className="h-[5vh]"> */}
            {/*   {formik.errors.password && ( */}
            {/*     <Alert variant="destructive"> */}
            {/*       <AlertDescription>{formik.errors.password}</AlertDescription> */}
            {/*     </Alert> */}
            {/*   )} */}
            {/* </div> */}
            <div className="flex justify-center">
              <ColorLoginButton
                type="submit"
                className="w-full bg-blue-500"
                active={
                  formik.values.password.length > 0 &&
                  formik.values.username.length > 0
                }
              >
                Đăng nhập
              </ColorLoginButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
