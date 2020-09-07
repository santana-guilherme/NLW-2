import React, { useState } from 'react';
import { Picker, View, PickerProperties } from 'react-native';
import styles from './styles';

interface SelectProps {
  options: Array<{
    value: string,
    label: string
  }>;
  defaultValue: string,
  defaultOption?: string,
  onChange(a: any ): void
}

const Select: React.FC<SelectProps> = ({ options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue.toString())

  function handleValueChange(value: string) {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <View style={{
        borderRadius: 8,
        height: 56,
        borderWidth: 1,
        borderColor: '#E6E6F0',
        marginBottom: 22,
        backgroundColor: '#FAFAFC',
        justifyContent: "center"}}>
      <Picker
        selectedValue={selectedValue}
        mode='dropdown'
        onValueChange={(item) => handleValueChange(item)}
      >
        {
          options.map(op => {
            return <Picker.Item label={op.label} value={op.value} key={op.value} />
          })
        }
      </Picker>
    </View>
  );
}

export default Select;