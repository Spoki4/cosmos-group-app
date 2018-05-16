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
  description: string;
  width: string;
  height: string;
  length: string;
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
        label='Краткое описание:'
        help={touched.description && errors.description}
        validateStatus={touched.description && errors.description ? 'error' : 'success'}
      >
        <Input
          name='description'
          placeholder='Описание...'
          value={values.description}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Ширина(мм):'
        help={touched.width && errors.width}
        validateStatus={
          touched.width && errors.width ? 'error' : 'success'
        }
      >
        <Input
          name='width'
          placeholder='10'
          value={values.width}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Длина(мм):'
        help={touched.length && errors.length}
        validateStatus={
          touched.length && errors.length ? 'error' : 'success'
        }
      >
        <Input
          name='length'
          placeholder='10'
          value={values.length}
          onChange={setFieldValue}
          onTouch={setFieldTouched}
        />
      </FormItem>
      <FormItem
        label='Высота(мм):'
        help={touched.height && errors.height}
        validateStatus={
          touched.height && errors.height ? 'error' : 'success'
        }
      >
        <Input
          name='height'
          placeholder='10'
          value={values.height}
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

export const ProductForm = withFormik<Props, FormData>({
  mapPropsToValues: (props: Props) => {
    if (props.data) {
      return {...props.data, id: undefined}
    }
    return {name: '', description: '', height: '', length: '', width: ''};
  },
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Введите название'),
    description: Yup.string().required('Введите описание'),
    height: Yup.number().typeError('Необходимо ввести числовое значение')
      .required('Введите высоту'),
    length: Yup.number().typeError('Необходимо ввести числовое значение')
      .required('Введите длину'),
    width: Yup.number().typeError('Необходимо ввести числовое значение')
      .required('Введите ширину')
  }),
  handleSubmit: (values, {props}) => {
    const transformedValues = {
      ...values,
      height: parseFloat(values.height),
      width: parseFloat(values.width),
      length: parseFloat(values.length)
    }
    props.onSubmit(transformedValues as any);
  }
})(FormMarkup);
