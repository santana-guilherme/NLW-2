import React, { Children, ReactNode } from 'react';
import styles from './styles';
import { Text, View, TextInput, ViewProperties } from 'react-native';

interface FieldsetProps extends ViewProperties {
  title: string,
  rightButton?: ReactNode
}

const Fieldset: React.FC<FieldsetProps> = ({ title, children, rightButton, ...rest }) => {
  return (
    <View {...rest}>
      <View style={styles.titleArea}>
        <Text style={styles.formTitle}>{title}</Text>
        {rightButton ? rightButton : null}
      </View>
      <View style={styles.horizontalLine} />
      {children}
    </View>
  );
}

export default Fieldset;