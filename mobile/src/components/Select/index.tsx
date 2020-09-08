import React, { useState } from 'react';
import { Picker, View, PickerProperties, Text, TextProperties } from 'react-native';
import styles from './styles';

interface SelectProps extends TextProperties {
  options: Array<{
    value: string,
    label: string
  }>;
  defaultValue?: string;
  onChange(a: any): void;
  label: string;
}

const Select: React.FC<SelectProps> = ({ options, defaultValue, label, onChange, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue?.toString() || 'default')

  function handleValueChange(value: string) {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <>
    <Text style={styles.label} {...rest}>{label}</Text>
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        mode='dropdown'
        onValueChange={(item) => handleValueChange(item)}
      >
        <Picker.Item label='Selecione uma opção' value='default' key={-1} />
        {
          options.map(op => {
            return <Picker.Item label={op.label} value={op.value} key={op.value} />
          })
        }
      </Picker>
    </View>
    </>
  );
}

export default Select;