import React from 'react'
import { View, Pressable,Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl,dimension, handlePress}) => {
  return (
    <View>
    <Pressable style={styles.btnContainer} onPress={handlePress}>

      <Image
      source={iconUrl}
      style={styles.btnImg(dimension)}
      resizeMode='cover'
      />
    </Pressable>
    </View>
  )
}

export default ScreenHeaderBtn