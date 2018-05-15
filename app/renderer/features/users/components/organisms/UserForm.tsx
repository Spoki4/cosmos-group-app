import * as React from 'react';
import * as Yup from 'yup';
import {Button, Form, Icon, Spin} from 'antd';
import {FormItem} from '../../../../components/FormItem';
import {Input} from '../../../../components/Input';
import {FormikProps, withFormik} from 'formik';

interface Props {
  fetching: boolean;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  username: string;
  password: string;
  email: string;
}

const FormMarkup = ({
  handleSubmit,
  errors,
  touched,
  values,
  setFieldValue,
  setFieldTouched,
  fetching
}: FormikProps<FormData> & Props) => (
  <Form onSubmit={handleSubmit}>
    <Spin spinning={fetching}>
      <FormItem
        help={touched.username && errors.username}
        validateStatus={
          touched.username && errors.username ? 'error' : 'success'
        }
      >
        <Input
          name='username'
          size='large'
          prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder='Логин'
          value={values.username}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        help={touched.email && errors.email}
        validateStatus={touched.email && errors.email ? 'error' : 'success'}
      >
        <Input
          name='email'
          size='large'
          prefix={<Icon type='mail' style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder='mail@example.com'
          value={values.email}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        help={touched.password && errors.password}
        validateStatus={
          touched.password && errors.password ? 'error' : 'success'
        }
      >
        <Input
          name='password'
          size='large'
          prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder='Пароль'
          value={values.password}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit' size='large'>
          Создать
        </Button>
      </FormItem>
    </Spin>
  </Form>
);

export const UserForm = withFormik<Props, FormData>({
  mapPropsToValues: (props: Props) => {
    return {email: '', password: '', username: ''};
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Введите логин'),
    password: Yup.string().required('Введите пароль'),
    email: Yup.string()
      .email('Введите электронный адрес')
      .required('Введите электронный адрес')
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  }
})(FormMarkup);
