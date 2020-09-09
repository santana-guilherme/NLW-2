import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden"
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3ee"
  },

  profileInfo: {
    marginLeft: 16
  },

  name: {
    fontFamily: "Archivo_700Bold",
    color: "#32264d",
    fontSize: 20,
    maxWidth: 250
  },

  subject: {
    fontFamily: "Poppins_400Regular",
    color: "#6a6180",
    fontSize: 12,
    marginTop: 4
  },

  bio: {
    paddingHorizontal: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: "#6a6180",
  },
  horizontalLine: {
    width: "100%",
    height: 0,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#E6E6F0'
  },
  scheduleBoard: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 7.6
  },
  scheduleHeaderText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#9C98A6'
  },
  footer: {
    backgroundColor: "#fafafc",
    padding: 24,
    alignItems: "center",
    marginTop: 24
  },

  price: {
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  textPrice: {
    fontFamily: 'Poppins_400Regular',
    color: "#6a6180",
    fontSize: 14,
  },

  priceValue: {
    fontFamily: 'Archivo_700Bold',
    color: "#8257e5",
    fontSize: 16,
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },

  favoriteButton: {
    backgroundColor: "#8257e5",
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },

  favorited: {
    backgroundColor: '#e33d3e'
  },

  contactButton: {
    backgroundColor: '#04d361',
    flex:1,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },

  contactButtonText: {
    marginLeft: 16,
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    color: '#FFF'
  }

})

export default styles;