import React, { Children } from 'react';
import styles from './styles';
import { Text, View, TextInput, ViewProperties } from 'react-native';

interface FieldsetProps extends ViewProperties {
  title: string
}

const Fieldset: React.FC<FieldsetProps> = ({ title, children, ...rest }) => {
  return (
    <View {...rest}>
      <Text style={styles.formTitle}>{title}</Text>
      <View style={styles.horizontalLine} />
      {children}
    </View>
  );
}

export default Fieldset;