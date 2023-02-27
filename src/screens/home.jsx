import React, {useCallback} from 'react';
import {Button, View} from 'react-native';

export const HomeScreen = ({navigation}) => {
  const handleDumbUserListPress = useCallback(() => {
    navigation.navigate('UserListDumb');
  }, [navigation]);
  const handleSmartUserListPress = useCallback(() => {
    navigation.navigate('UserListSmart');
  }, [navigation]);
  const handleUserByIdPress = useCallback(() => {
    navigation.navigate('UserById');
  }, [navigation]);

  return (
    <View>
      <Button
        title={'Dumb User List Screen'}
        onPress={handleDumbUserListPress}
      />
      <Button
        title={'Smart User List Screen'}
        onPress={handleSmartUserListPress}
      />
      <Button title={'User by Id Screen'} onPress={handleUserByIdPress} />
    </View>
  );
};
