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
  address: string;
  contacts: string;
  maxCapacity: string;
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
        label='Адрес:'
        help={touched.address && errors.address}
        validateStatus={touched.address && errors.address ? 'error' : 'success'}
      >
        <Input
          name='address'
          placeholder='ул. 3-интернационала д.91'
          value={values.address}
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
      <FormItem
        label='Вместимость (кв.м):'
        help={touched.maxCapacity && errors.maxCapacity}
        validateStatus={
          touched.maxCapacity && errors.maxCapacity ? 'error' : 'success'
        }
      >
        <Input
          name='maxCapacity'
          placeholder='10'
          value={values.maxCapacity}
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

export const StockForm = withFormik<Props, FormData>({
  mapPropsToValues: (props: Props) => {
    if (props.data) {
      return {...props.data, id: undefined}
    }
    return {name: '', address: '', contacts: '', maxCapacity: ''};
  },
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Введите название'),
    address: Yup.string().required('Введите адрес'),
    contacts: Yup.string().required('Введите контакты'),
    maxCapacity: Yup.number().typeError('Необходимо ввести числовое значение')
      .required('Введите вместимость'),
  }),
  handleSubmit: (values, {props}) => {
    const transformedValues = {
      ...values,
      maxCapacity: parseFloat(values.maxCapacity),
    }
    props.onSubmit(transformedValues as any);
  }
})(FormMarkup);
