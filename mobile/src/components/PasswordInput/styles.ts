import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%"
  },
  input: {
    height: 54,
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: "center",
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E6E6F0',
    paddingLeft: 24,
    borderBottomLeftRadius: 8,
  },
  icon: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: '#E6E6F0',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 8 ,

    backgroundColor: '#FFF',
    paddingHorizontal: 10
  },
  image: {

  }
})

export default styles;