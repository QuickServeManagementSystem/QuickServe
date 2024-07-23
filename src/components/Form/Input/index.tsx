import {
  AppTextInput as TextInput,
  AppTextInputProps,
} from '@views/AppTextInput';
import React from 'react';
import {
  Control,
  UseControllerProps,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';
import {useTheme} from 'styled-components/native';

import {FormItem, FormItemProps} from '../Item';

interface FormInputProps<T extends FieldValues>
  extends AppTextInputProps,
    Omit<FormItemProps, 'error' | 'children' | 'containerStyle' | 'itemProps'> {
  name: Path<T>;
  control: Control<T, any>;
  rules?: UseControllerProps<T>['rules'];
  onExtraChange?: (e: string) => void;
  label?: string;
  fullWidth?: boolean;
  itemContainerStyle: FormItemProps['containerStyle'];
}

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  onExtraChange,

  // container
  isRequired,
  itemContainerStyle,
  ...inputProps
}: FormInputProps<T>) => {
  const appTheme = useTheme();

  const containerStyleDefault: FormItemProps['containerStyle'] = {
    marginBottom: appTheme.gap_8,
  };

  const itemStyleDefault: FormItemProps['containerStyle'] = {
    borderRadius: appTheme.border_radius_5,
    padding: appTheme.gap_14,
    marginTop: appTheme.gap_6,
    borderWidth: 1,
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field, fieldState: {error}}) => (
        <FormItem
          label={label}
          isRequired={isRequired}
          error={error?.message}
          containerStyle={[containerStyleDefault, itemContainerStyle]}>
          <TextInput
            {...inputProps}
            containerStyle={[
              itemStyleDefault,
              inputProps.containerStyle,
              {
                borderColor: error?.message
                  ? appTheme.colors.error
                  : appTheme.colors.stroke_primary,
              },
            ]}
            {...field}
            onChangeText={e => {
              field.onChange(e);
              onExtraChange?.(e);
            }}
          />
        </FormItem>
      )}
    />
  );
};
