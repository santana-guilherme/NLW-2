import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, /*Make element fill all screen */
    justifyContent: 'center',
    paddingHorizontal: 40,
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
  inputTop: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputBottom: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: 24
  },
  button: {
    backgroundColor: '#DCDCE5',
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonEnabled: {
    backgroundColor: '#04D361',
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30,
  },
  buttonTextEnabled: {
    color: 'white',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 26,
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#9C98A6',
    fontSize: 16,
    lineHeight: 26,
  },

  textInformation: {
    marginBottom: 147
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    lineHeight:42,
    color: '#32264D',
    marginBottom: 15
  },

  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180'
  },

  question: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 26,
    color: '#32264D',
    marginBottom: 24
  }

})

export default styles;