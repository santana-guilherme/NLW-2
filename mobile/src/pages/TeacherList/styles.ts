import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },

  totalProffys: {
    flexDirection: 'row',
    alignItems: "center"
  },
  totalProffysIcon: {
    width: 23,
    height: 23,
    marginRight: 8
  },
  totalProffysText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color:'#D4C2FF'
  },
  teacherList: {
    marginTop: -40
  },

  searchForm: {
    marginTop: 20,
    marginBottom: 24
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 16,
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBlock: {
    width: '48%'
  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitButtonText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    color: '#FFF'
  },

  flFooterComponent: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 22,
    color: '#6A6180',
    textAlign: "center"
  }

})


export default styles;