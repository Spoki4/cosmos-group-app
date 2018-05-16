import * as React from 'react';
import * as Yup from 'yup';
import {Button, Form, Spin} from 'antd';
import {FormikProps, withFormik} from 'formik';
import {FormItem} from '../../../components/FormItem';
import {Input} from '../../../components/Input';

interface Props {
  fetching: boolean;
  data?: FormData;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  contacts: string;
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
        label='Название:'
        help={touched.name && errors.name}
        validateStatus={
          touched.name && errors.name ? 'error' : 'success'
        }
      >
        <Input
          name='name'
          placeholder='Название'
          value={values.name}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Контакты:'
        help={touched.contacts && errors.contacts}
        validateStatus={
          touched.contacts && errors.contacts ? 'error' : 'success'
        }
      >
        <Input
          name='contacts'
          placeholder='+7(903)777-77-77, stock@stock.com'
          value={values.contacts}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit' size='large'>
          Сохранить
        </Button>
      </FormItem>
    </Spin>
  </Form>
);

export const SupplierForm = withFormik<Props, FormData>({
  mapPropsToValues: (props: Props) => {
    if (props.data) {
      return {...props.data, id: undefined}
    }
    return {name: '', contacts: '',};
  },
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Введите название'),
    contacts: Yup.string().required('Введите контакты'),
  }),
  handleSubmit: (values, {props}) => {
    const transformedValues = {
      ...values
    }
    props.onSubmit(transformedValues as any);
  }
})(FormMarkup);
