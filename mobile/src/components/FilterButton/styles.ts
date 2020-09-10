import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#D4C2FF'
  },
  horizontalLine: {
    width: '100%',
    borderColor: '#9871F5',
    borderWidth: .5
  }
})

export default styles;