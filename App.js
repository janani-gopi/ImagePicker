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
      {
        text: 'OK',
        onPress: () => {
          setchecked(false);
          setImage([]);
        },
      },
    ]);
  }
  //function to select a image
  function selectSingleImage(index) {
    const images = image.filter((each, index1) => {
      if (index1 == index) {
        each.isSelected ? (each.isSelected = false) : (each.isSelected = true);
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
        onLongPress={() => {
          deleteSingleImage(index);
        }}
      />

      <Text style={styles.header}>Uploaded images</Text>
      {image.length > 0 && (
        <CheckBox
          style={{padding: 10}}
          onClick={() => {
            setchecked(prev => !prev);
            const images = image.map(each => {
              each.isSelected
                ? (each.isSelected = false)
                : (each.isSelected = true);
              return each;
            });
            setImage(images);
          }}
          checkBoxColor="#474973"
          isChecked={checked}
          rightText="Select all to delete"
          rightTextStyle={{color: '#474973'}}
        />
      )}

      <ScrollView>
        <View style={styles.imgcontainer}>
          {image.length > 0 ? (
            image.map((each, index) => {
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    selectSingleImage(index);
                    setShowDelete(prev => !prev);
                    setIndex(index);
                  }}
                  onPress={() => {
                    setIndex(index);
                    setIsVisible(true);
                  }}
                  key={index}>
                  <Image
                    source={{uri: each.image.path}}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 15,
                      borderWidth: each.isSelected ? 2 : null,
                      borderColor: each.isSelected ? '#474973' : null,
                    }}
                    key={index}
                  />
                  <FontAwesome
                    name="check-circle"
                    color="#474973"
                    size={25}
                    style={{
                      display: each.isSelected ? 'flex' : 'none',
                      position: 'absolute',
                      top: 0,
                      left: 95,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={{
                color: '#474973',
                fontSize: 30,
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingTop: 250,
                padding: 20,
                textAlign: 'center',
              }}>
              Upload a photo to display here!
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.btncontainer}>
        <Pressable style={styles.btn} onPress={fromGallery}>
          <FontAwesome name="photo" color="#474973" size={35} />
          <Text style={{color: 'gray',marginLeft:-5}}>Gallery</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={usingCamera}>
          <FontAwesome name="camera" color="#474973" size={35} />
          <Text style={{color: 'gray', textAlign: 'center', marginLeft:-8}}>Camera</Text>
        </Pressable>
      </View>
      {showDelete && (
        <Pressable
          onPress={() => {
            deleteSingleImage(index);
          }}
          style={styles.deleteallbtn}>
          <Text style={{textAlign: 'center'}}>Delete</Text>
        </Pressable>
      )}

      {checked && (
        <Pressable onPress={deleteAll} style={styles.deleteallbtn}>
          <Text style={{textAlign: 'center'}}>Delete all</Text>
        </Pressable>
      )}
    </View>
  );
}
