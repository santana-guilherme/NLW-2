import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#8257e5",
  },

  topBar: {
    marginTop: 5,
    padding: 40,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#6842C2',
    backgroundColor: '#774DD6'
  },

  topTitle: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 15,
    color: '#D4C2FF'
  },

  title:{
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40
  },

  header: {
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  children: {
    paddingHorizontal: 40
  }
})

export default styles;