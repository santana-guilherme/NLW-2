import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15
  },
  backButton: {
    width: 60,
    height: 16,
    justifyContent: "center",
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: '#C1BCCC',
    marginHorizontal: 6
  },
  filledDot: {
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: '#8257E5',
    marginHorizontal: 6
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})

export default styles;