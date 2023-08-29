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
    padding: 20,
    backgroundColor: '#cdb4db',
    borderRadius: 25,
    width: 150,
    marginBottom: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  btn1: {
    padding: 20,
    backgroundColor: '#cdb4db',
    borderTopRightRadius: 25,
    borderBottomEndRadius: 25,
  },
  btn2: {
    padding: 20,
    backgroundColor: '#cdb4db',
    borderTopLeftRadius: 25,
    borderBottomStartRadius: 25,
  },
  btntxt: {
    color: 'white',
    fontSize: 15,
  },
  header: {
    color: '#cdb4db',
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 25,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 15,
  },
  displaytxt: {
    fontSize: 15,
    color: '#cdb4db',
    textAlign: 'center',
    height: 200,
  },
  txt: {
    textAlign: 'center',
  },
  icon: {
    color: '#cdb4db',
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
    padding:50
  },
  
});
