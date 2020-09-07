import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    height: 339,
  },
  userInfo: {
    flex: 1,
    marginTop: 35,
    alignItems: 'center',
    width: '100%',
  },
  userAvatar: {
    width:140,
    height:140,
    borderRadius: 50,
    marginBottom: 24
  },
  cameraIcon: {
    position: 'absolute',
    right: 4,
    bottom: 25
  },
  userName: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 24,
    lineHeight: 25,
    color: 'white',
    marginBottom: 14
  },
  teacherClasses: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 17,
    color: '#D4C2FF',
  },
  form: {
    backgroundColor: 'white',
    borderColor: "#E6E6F0",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  fieldset: {
    padding: 24
  },
  textInput: {
    height: 56,
    backgroundColor: '#FAFAFC',
    borderColor: '#E6E6F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6A6180',
    marginBottom: 22
  },

  textArea: {
    paddingTop: 24,
    height: 260,
    paddingRight: 24,
    textAlignVertical: 'top'
  },

  timesDisplay: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 20
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#E6E6F0',
    backgroundColor: '#FAFAFC',
    padding: 24,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  button: {
    height: 56,
    borderRadius: 8,
    backgroundColor: '#04D361',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 20,
    color: 'white'
  }
})

export default styles;