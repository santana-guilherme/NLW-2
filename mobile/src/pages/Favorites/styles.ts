import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7'
  },
  favoritesProffys: {
    flexDirection: 'row',
    alignItems: "center"
  },
  favoritesProffysIcon: {
    width: 23,
    height: 23,
    marginRight: 8
  },
  favoritesProffysText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color:'#D4C2FF'
  },
  teacherList: {
    marginTop: -40
  },
})


export default styles;