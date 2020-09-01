import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  top:{
    flex: 1,
    maxHeight: "50%",
  },

  bottom: {
    flex: 1,
    maxHeight: "50%",
    minHeight: "50%",
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 46,
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color:'#32264D',
    fontSize: 24,
    lineHeight: 34
  },
  createAccount: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8257E5',
    lineHeight: 24
  },
  input: {
    height: 54,
    backgroundColor: '#FFF',
    justifyContent: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
    paddingLeft: 24
  },
  form: {
    marginTop: 24
  },
  inputTop: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputBottom: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  formFooter:{
    marginTop: 24
  },
  formOptions:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionsText: {
    color: '#9C98A6',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12
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
  }
})

export default styles;