import { FormProps, FormItemProps, InputProps, ISelectProps } from "element-plus"

type TType = 'Input' | 'Select'

interface IFormItemProps extends Partial<FormItemProps>{
  type:TType
  prop:string
}
// Input 组件
type IInputProps = Partial<InputProps> & IFormItemProps & {}
// Select 组件
type IISelectProps = Partial<ISelectProps> & IFormItemProps & {
  options?: Array<{ label: string; value: string | number }>,
}

// FormItem 组件
type TFormItemsProps = Array<IInputProps | IISelectProps>

interface IFormProps extends Partial<FormProps>{
    formItems:TFormItemsProps
    formData:{
      [key:string]:any
    }
}

export type {
  IFormProps,
  IInputProps,
  IISelectProps,
}