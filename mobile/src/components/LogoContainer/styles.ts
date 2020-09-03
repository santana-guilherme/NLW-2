import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: '#8257E5',
    maxHeight: '50%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },

  logoContent: {
    justifyContent: "center",
    marginTop: '10%'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  logo: {
    flex: 1,
    maxHeight: 60,
    width: 200,
  },

  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 1
  }

})

export default styles;