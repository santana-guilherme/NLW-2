import { StyleSheet } from "react-native";
import { ceil } from "react-native-reanimated";

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  bottom: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32
  },
  backIcon:{
    marginTop: 21,
    marginBottom: 21,
    width: 60,
    height: 30,
    justifyContent: "center"
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 34,
    color: '#32264D',
    marginBottom: 16
  },
  subTitle:{
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',
    marginBottom: 30
  },
  input: {
    height: 64,
    backgroundColor: '#FFF',
    justifyContent: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
    paddingLeft: 24,
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 24
  },
  button:{
    backgroundColor: '#DCDCE5',
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30
  },
  buttonEnabled:{
    backgroundColor: '#04D361',
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30
  },
  buttonText:{
    fontFamily: 'Archivo_700Bold',
    color: '#9C98A6',
    fontSize: 16,
    lineHeight: 26,
  },
  buttonTextEnabled: {
    color: 'white',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 26,
  },
})

export default styles;