import * as remx from 'remx';

const initialState = {
  loading: true,
  userIds: [],
  userById: {},
  nameById: {},
};

const state = remx.state(initialState);

const setters = (() => {
  const _normalizeUser = user => {
    const name = user.name;
    user.name = name.id;

    state.userById[user.id] = user;
    state.nameById[name.id] = name;
  };

  const _reset = () => {
    state.userIds = [];
    state.userById = {};
    state.nameById = {};
  };

  return remx.setters({
    setLoading(isLoading) {
      state.loading = isLoading;
    },

    setUsers(users) {
      _reset();
      for (const user of users) {
        state.userIds.push(user.id);
        _normalizeUser(user);
      }
      state.loading = false;
    },

    addUser(user) {
      state.userIds = [user.id, ...state.userIds];
      _normalizeUser(user);
    },

    removeUser(id) {
      const user = state.userById[id];

      delete state.userById[id];
      delete state.nameById[user.name];

      state.userIds = state.userIds.filter(it => it !== user.id);
    },

    updateUser(id, updatedUser) {
      state.userById[id] = updatedUser;
    },

    updateName(id, updatedName) {
      state.nameById[id] = updatedName;
    },

    shuffle() {
      const copy = [...state.userIds];
      const item = copy.pop();
      copy.unshift(item);
      state.userIds = copy;
    },
  });
})();

const getters = (() => {
  return remx.getters({
    isLoading() {
      return state.loading;
    },

    getUserIds() {
      return state.userIds;
    },

    getUserById(id) {
      return state.userById[id];
    },

    getNameById(id) {
      return state.nameById[id];
    },
  });
})();

export const userByIdStore = {
  ...setters,
  ...getters,
};
