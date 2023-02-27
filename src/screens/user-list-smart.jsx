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

import {userListStore} from '../stores/user-list';
import {users as usersData} from '../constants/users';

const UserListItemSmart = React.memo(({userId}) => {
  const {user} = useConnect(() => ({
    user: userListStore.getUser(userId),
  }));

  console.log('in UserListItemSmart', user.id);

  const handleChangeNamePress = useCallback(() => {
    userListStore.updateUser(user.id, {
      ...user,
      name: {firstName: 'Changed', lastName: 'Name'},
    });
  }, [user]);

  const handleChangeNameWithListPress = useCallback(() => {
    userListStore.updateUserWithList(user.id, {
      ...user,
      name: {firstName: 'Changed', lastName: 'Name'},
    });
  }, [user]);

  const handleRemovePress = useCallback(() => {
    userListStore.removeUser(user.id);
  }, [user]);

  return (
    <View style={styles.itemContainer}>
      <Text>{user.name.firstName + ' ' + user.name.lastName}</Text>
      <View style={styles.itemCtaContainer}>
        <Text style={styles.updateCta} onPress={handleChangeNameWithListPress}>
          {'[UL]'}
        </Text>
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
UserListItemSmart.displayName = 'UserListItemSmart';

export const UserListSmart = React.memo(() => {
  console.log('in UserListSmart');

  const {isLoading, users} = useConnect(() => ({
    isLoading: userListStore.isLoading(),
    users: userListStore.getUsers(),
  }));

  const handleAddUserPress = useCallback(() => {
    userListStore.addUser({
      id: Date.now().toString(),
      name: {firstName: 'Test', lastName: 'Name!'},
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        userListStore.setUsers(cloneDeep(usersData.slice(0, 5)));
      }, 2000);
    }
  }, [isLoading]);

  const keyExtractor = useCallback(item => item.id, []);

  const renderItem = useCallback(({item}) => {
    return <UserListItemSmart userId={item.id} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            keyExtractor={keyExtractor}
            data={users}
            renderItem={renderItem}
          />
          <Button title={'Add User'} onPress={handleAddUserPress} />
        </>
      )}
    </SafeAreaView>
  );
});
UserListSmart.displayName = 'UserListSmart';

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
