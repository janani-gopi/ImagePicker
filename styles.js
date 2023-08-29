import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8e8',
  },
  imgcontainer: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5,
    flexWrap: 'wrap',
    rowGap: 5,
  },
  btncontainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop:20
  },
  btn: {
    padding:20
  },
  btntxt: {
    color: 'white',
    fontSize: 15,
  },
  header: {
    backgroundColor: '#474973',
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 25,
    paddingTop:30
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 15,
  },
  displaytxt: {
    fontSize: 15,
    color: '#474973',
    textAlign: 'center',
    height: 200,
  },
  txt: {
    textAlign: 'center',
  },
  icon: {
    color: '#474973',
    fontSize: 25,
    position: 'absolute',
    top: -5,
    right: 2,
    padding: 4,
  },
  binicon:{
    justifyContent:"center",
    alignContent:"center",
    paddingHorizontal: 170,
    padding:10
  },
  deleteallbtn:{
    padding:20,
    backgroundColor:"#474973"
  }
  
});
