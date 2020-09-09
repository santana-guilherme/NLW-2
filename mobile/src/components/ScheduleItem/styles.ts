import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6F0',
    backgroundColor:'#FAFAFC',
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: "center",
    height: 40,
    marginBottom: 8
  },

  scheduleItemDisabled: {
    opacity: .5,
  },

  text: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#6A6180',
    width: 80,
  },

  timeText: {
    textAlign: "center"
  },
})

export default styles;