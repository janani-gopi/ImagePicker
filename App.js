import {useState} from 'react';
import {styles} from './styles';
import CheckBox from 'react-native-check-box';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageView from 'react-native-image-viewing';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function App() {
  //state initialization
  const [image, setImage] = useState([]);
  const [checked, setchecked] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  //to open camera and upload image
  function usingCamera() {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      setImage(prev => [...prev, {isSelected: false, image}]);
    });
  }
  // open gallery and to upload image
  function fromGallery() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      setImage(prev => [...prev, {isSelected: false, image}]);
    });
  }
  //to delete a single image
  function deleteSingleImage(index) {
    Alert.alert('Delete', 'You surely want to delete this image?', [
      {
        text: 'Cancel',
        onPress: () => {
          const images = image.filter((each, index1) => {
            if (index1 == index) {
              each.isSelected = false;
              return each;
            } else {
              return each;
            }
          });
          setImage(images);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const images = image.filter((each, index1) => {
            if (index1 != index) {
              return each;
            }
          });
          setImage(images);
        },
      },
    ]);
    setShowDelete(false);
  }
  //to delete all image
  function deleteAll() {
    Alert.alert('Delete all', 'You surely want to delete all images?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setImage([])},
    ]);
    console.log('all images cleared');
  }
  //function to select a image
  function selectSingleImage(index) {
    const images = image.filter((each, index1) => {
      if (index1 == index) {
        each.isSelected ? each.isSelected = false : each.isSelected = true
        return each;
      } else {
        return each;
      }
    });
    console.log('images', images);
  }
  //Array to view the images
  const imagesarray = image?.map(each => {
    return {
      uri: each.image.path,
    };
  });
  return (
    <View style={styles.container}>
      {/* Image viewer component */}
      <ImageView
        images={imagesarray}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <View style={styles.btncontainer}>
        <Pressable style={styles.btn1} onPress={fromGallery}>
          <FontAwesome name="photo" color="white" size={25} />
        </Pressable>

        <Pressable style={styles.btn2} onPress={usingCamera}>
          <FontAwesome name="camera" color="white" size={25} />
        </Pressable>
      </View>
      <CheckBox
        style={{padding: 30}}
        onClick={() => {
          setchecked(prev => !prev);
        }}
        checkBoxColor="#cdb4db"
        isChecked={checked}
        rightText="Select all to delete"
        rightTextStyle={{color: '#cdb4db'}}
      />
      <Text style={styles.header}>GALLERY</Text>

      <ScrollView>
        <View style={styles.imgcontainer}>
          {image?.map((each, index) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  selectSingleImage(index);
                  setIndex(index);
                  setShowDelete(prev => !prev);
                }}
                onPress={() => {
                  setIndex(index);
                  setIsVisible(visible);
                }}
                key={index}>
                <Image
                  source={{uri: each.image.path}}
                  style={styles.image}
                  key={index}
                />
                <FontAwesome
                  name="check"
                  color="white"
                  size={55}
                  style={{
                    display: each.isSelected ? 'flex' : 'none',
                    position: 'absolute',
                    top: 30,
                    left: 35,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {showDelete && (
        <View style={styles.binicon}>
          <MaterialIcons
            name="delete"
            size={45}
            color="#cdb4db"
            onPress={() => {
              deleteSingleImage(index);
            }}
          />
        </View>
      )}

      {checked && (
        <Pressable onPress={deleteAll} style={styles.btn}>
          <Text style={{textAlign: 'center'}}>Delete all</Text>
        </Pressable>
      )}
    </View>
  );
}
