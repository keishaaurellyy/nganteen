import { forwardRef, type Ref } from "react";
import { Input } from "./input";
import { TextArea } from "./text-area";
import type { InputProps } from "./input";
import type { TextAreaProps } from "./text-area";

type BaseFieldProps = {
  multiline?: boolean;
};

export type TextFieldProps = BaseFieldProps & (InputProps | TextAreaProps);

const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(({ multiline, ...props }, ref) => {
  if (multiline) {
    return (
      <TextArea
        {...(props as TextAreaProps)}
        ref={ref as Ref<HTMLTextAreaElement>}
      />
    );
  }

  return (
    <Input {...(props as InputProps)} ref={ref as Ref<HTMLInputElement>} />
  );
});

TextField.displayName = "TextField";

export { TextField };
