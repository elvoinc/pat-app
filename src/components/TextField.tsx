import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
} from "@chakra-ui/react";
import { Field, FieldHookConfig, useField } from "formik";
import { FC } from "react";

interface ICustomFieldProps {
  label: string;
}

export const TextField: FC<FieldHookConfig<string> & ICustomFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Field as={Radio} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
