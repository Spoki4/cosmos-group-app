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
  fullname: string;
  position: string;
  salary: string;
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
        label='ФИО:'
        help={touched.fullname && errors.fullname}
        validateStatus={
          touched.fullname && errors.fullname ? 'error' : 'success'
        }
      >
        <Input
          name='fullname'
          placeholder='ФИО'
          value={values.fullname}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Должность:'
        help={touched.position && errors.position}
        validateStatus={touched.position && errors.position ? 'error' : 'success'}
      >
        <Input
          name='position'
          placeholder='Менджер по продажам'
          value={values.position}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Заработная плата:'
        help={touched.salary && errors.salary}
        validateStatus={
          touched.salary && errors.salary ? 'error' : 'success'
        }
      >
        <Input
          name='salary'
          placeholder='30000'
          value={values.salary}
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

export const EmployeeForm = withFormik<Props, FormData>({
  mapPropsToValues: (props: Props) => {
    if (props.data) {
      return {...props.data, id: undefined}
    }
    return {fullname: '', position: '', salary: ''};
  },
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    fullname: Yup.string().required('Введите ФИО'),
    position: Yup.string().required('Введите должность'),
    salary: Yup.number().typeError('Необходимо ввести числовое значение')
      .required('Введите заработную плату')
  }),
  handleSubmit: (values, {props}) => {
    const transformedValues = {...values, salary: parseFloat(values.salary)}
    props.onSubmit(transformedValues as any);
  }
})(FormMarkup);
