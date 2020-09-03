import { StyleSheet } from "react-native";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";

//Styled components

const styles = StyleSheet.create({
  container: {
    flex: 1, /*Make element fill all screen */
    justifyContent: 'center',
  },

  top: {
    flex: 1,
    paddingHorizontal: 32,
    height: "50%",
    width: "100%",
    backgroundColor: '#8257E5',
    justifyContent: "center"
  },

  userHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width:"100%",
    alignItems: "center",
    marginBottom: 40
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: "center"
  },

  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 16
  },

  userName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#D4C2FF',
    fontWeight: '600'
  },

  logoutButton:{
    width: 40,
    height:40,
    backgroundColor: '#774DD6',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  
  logOutIcon:{
    width: 20,
    height: 20,
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
  },

  bottom: {
    height: "50%",
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 42
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between'
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#9871F5',
  },

  buttonSecondary: {
    backgroundColor: '#04D361',
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: "#FFF",
    fontSize: 20
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  }
});

export default styles;