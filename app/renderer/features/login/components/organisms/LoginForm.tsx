import * as React from 'react';
import {Button, Form, Icon, Spin} from 'antd';
import {FormikProps, withFormik} from 'formik';
import {FormItem} from '../../../../components/FormItem';
import {Input} from '../../../../components/Input';
import styled from 'styled-components';
import * as Yup from 'yup';

interface Props {
  loading: boolean;
  onSubmit: (data: LoginFormData) => void;
}

interface LoginFormData {
  login: string;
  password: string;
}

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const LoginFormMarkup = ({
  handleSubmit,
  errors,
  touched,
  values,
  setFieldValue,
  setFieldTouched,
  loading
}: FormikProps<LoginFormData> & Props) => (
  <Form onSubmit={handleSubmit}>
    <Spin spinning={loading}>
      <FormItem
        help={touched.login && errors.login}
        validateStatus={touched.login && errors.login ? 'error' : 'success'}
      >
        <Input
          name='login'
          size='large'
          prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder='Логин'
          value={values.login}
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
        <FullWidthButton type='primary' htmlType='submit' size='large'>
          Войти
        </FullWidthButton>
      </FormItem>
    </Spin>
  </Form>
);

export const LoginForm = withFormik<Props, LoginFormData>({
  validationSchema: Yup.object().shape({
    login: Yup.string().required('Введите логин'),
    password: Yup.string().required('Введите пароль')
  }),
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  }
})(LoginFormMarkup);
