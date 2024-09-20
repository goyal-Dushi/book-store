const KEY = 'user';

class UserUtil {
  getUserData() {
    const userData = window.localStorage.getItem(KEY);
    if (!userData) {
      return null;
    }

    return JSON.parse(userData);
  }

  getUserId() {
    const data = this.getUserData();
    return data?._id;
  }

  getUserRole() {
    const data = this.getUserData();
    return data?.role;
  }

  saveDataToLs(data) {
    if (!data) {
      return;
    }

    window.localStorage.setItem(KEY, JSON.stringify(data));
  }

  removeDataFromLs() {
    window.localStorage.removeItem(KEY);
  }
}

export { UserUtil };
