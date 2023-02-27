import React, {useCallback, useEffect} from 'react';

import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useConnect} from 'remx';
import {cloneDeep} from 'lodash';

import {userByIdStore} from '../stores/user-by-id';
import {users as usersData} from '../constants/users';

const UserListByIdItem = React.memo(({userId}) => {
  console.log('in UserByIdItem', userId);

  const {user, name} = useConnect(() => {
    const user = userByIdStore.getUserById(userId);
    const name = userByIdStore.getNameById(user.name);

    return {
      user,
      name,
    };
  });

  const handleChangeNamePress = useCallback(() => {
    userByIdStore.updateName(user.name, {
      firstName: 'Changed',
      lastName: 'Name',
    });
  }, [user]);

  const handleRemovePress = useCallback(() => {
    userByIdStore.removeUser(user.id);
  }, [user]);

  return (
    <View style={styles.itemContainer}>
      <Text>{name.firstName + ' ' + name.lastName}</Text>
      <View style={styles.itemCtaContainer}>
        <Text style={styles.updateCta} onPress={handleChangeNamePress}>
          {'[U]'}
        </Text>
        <View style={styles.ctaSpacings} />
        <Text style={styles.xCta} onPress={handleRemovePress}>
          [X]
        </Text>
      </View>
    </View>
  );
});
UserListByIdItem.displayName = 'UserListByIdItem';

export const UserById = () => {
  console.log('in UserById');

  const {isLoading, userIds} = useConnect(() => ({
    isLoading: userByIdStore.isLoading(),
    userIds: userByIdStore.getUserIds(),
  }));

  const handleAddUserPress = useCallback(() => {
    userByIdStore.addUser({
      id: Date.now().toString(),
      name: {firstName: 'Test', lastName: 'Name!'},
    });
  }, []);

  const handleShufflePress = useCallback(() => {
    userByIdStore.shuffle();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        userByIdStore.setUsers(cloneDeep(usersData.slice(0, 5)));
      }, 2000);
    }
  }, [isLoading]);

  const keyExtractor = useCallback(item => item, []);

  const renderItem = useCallback(({item}) => {
    return <UserListByIdItem userId={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            keyExtractor={keyExtractor}
            data={userIds}
            renderItem={renderItem}
          />
          <Button title={'Add User'} onPress={handleAddUserPress} />
          <Button title={'Shuffle'} onPress={handleShufflePress} />
        </>
      )}
    </SafeAreaView>
  );
};
UserById.displayName = 'UserById';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
  },
  itemCtaContainer: {
    flexDirection: 'row',
  },
  updateCta: {
    color: '#0000FF',
  },
  ctaSpacings: {
    width: 4,
  },
  xCta: {
    color: '#FF0000',
  },
});
