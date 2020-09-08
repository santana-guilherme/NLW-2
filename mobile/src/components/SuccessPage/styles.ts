import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8257E5",
    alignItems: "center",
    paddingHorizontal: 39
  },
  mainContent: {
    width: "100%",
    height: 555,
    alignItems: "center",
    marginBottom: 54
  },
  successIcon: {
    marginBottom: 24,
    marginTop: 150
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 32,
    lineHeight: 37,
    color: 'white',
    maxWidth: 200,
    textAlign: "center",
    marginBottom: 16
  },
  text: {
    fontFamily:  'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#D4C2FF',
    textAlign: "center"
  },
  button: {
    height: 56,
    backgroundColor: '#04D361',
    borderRadius: 8,
    width: 294,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 67
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 26,
    color: 'white'
  }
})

export default styles;