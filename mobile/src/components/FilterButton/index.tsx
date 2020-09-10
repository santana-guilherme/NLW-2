import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

interface FilterButtonProps extends RectButtonProperties {
  onPress(): void;
  isFilterVisible: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress, isFilterVisible, ...rest }) => {
  return (
    <RectButton onPress={onPress} style={styles.button} {...rest}>
      <View style={styles.filterInfo}>
        <Feather name="filter" size={20} color='#04D361' />
        <Text style={styles.text}>Filtrar por dia, hora e matéria</Text>
        <Ionicons name={isFilterVisible ? 'ios-arrow-up' : 'ios-arrow-down'} size={20} color='#A380F6' />
      </View>
      <View style={styles.horizontalLine}/>
    </RectButton>
  );
}

export default FilterButton;