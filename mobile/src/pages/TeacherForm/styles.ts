import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    backgroundColor: 'white',
    borderColor: "#E6E6F0",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: -60
  },
  fieldset: {
    padding: 24
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 25
  },
  userAvatar: {
    height: 64,
    width: 64,
    borderRadius: 50,
    marginRight: 15
  },
  userTextInfo: {
    justifyContent: "space-between"
  },
  userName:{
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
    lineHeight: 25,
    color: '#32264D'
  },
  userSubjects: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: '#6A6180'
  },
  bio: {
    paddingTop: 24,
    height: 260,
    paddingRight: 24,
    textAlignVertical: 'top'
  },
  headerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#D4C2FF',
    marginTop: -20,
    marginBottom: 80
  },
  newScheduleButton: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#8257E5'
  },
  timesDisplay: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 20
  },
  deleteItem: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  horizontalLine:{
    borderWidth: 1,
    borderColor: '#E6E6F0',
    marginTop: 8,
    marginBottom: 25,
    width: "29%"
  },
  deleteText:{
    fontFamily: 'Archivo_700Bold',
    fontSize: 12,
    lineHeight: 20,
    color: '#E33D3D'
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
  },
})

export default styles;