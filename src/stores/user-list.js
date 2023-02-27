import * as remx from 'remx';

const initialState = {
  loading: true,
  users: [],
};

const state = remx.state(initialState);

const setters = remx.setters({
  setLoading(isLoading) {
    state.loading = isLoading;
  },

  setUsers(users) {
    state.users = users;
    state.loading = false;
  },

  addUser(user) {
    state.users = [...state.users, user];
  },

  removeUser(id) {
    state.users = state.users.filter(it => it.id !== id);
  },

  updateUserWithList(id, newUser) {
    const index = state.users.findIndex(it => it.id === id);
    state.users = [
      ...state.users.slice(0, index),
      newUser,
      ...state.users.slice(index + 1),
    ];
  },

  updateUser(id, newUser) {
    const index = state.users.findIndex(it => it.id === id);
    state.users[index] = newUser;
  },

  shuffle() {
    const copy = [...state.users];
    const item = copy.pop();
    copy.unshift(item);
    state.users = copy;
  },
});

const getters = remx.getters({
  isLoading() {
    return state.loading;
  },

  getUsers() {
    return state.users;
  },

  getUser(id) {
    return state.users.find(it => it.id === id);
  },
});

export const userListStore = {
  ...setters,
  ...getters,
};
