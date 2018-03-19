import * as React from "react"
import { Form } from "antd"
import { FormItemProps } from "antd/lib/form"

export const FormItem = ({
  children,
  ...spread
}: FormItemProps & { children: React.ReactNode }) => (
  <Form.Item {...spread}>{children}</Form.Item>
)
