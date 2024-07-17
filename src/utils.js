class UserUtil {
  constructor(data) {
    this.data = data;
  }

  getUserData() {
    const userData = window.localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/login';
      return null;
    }

    return JSON.parse(userData);
  }

  getUserId() {
    const data = JSON.parse(this.getUserData());
    return data._id;
  }

  saveDataToLs() {
    if (!this.data) {
      return;
    }

    window.localStorage.setItem('user', this.data);
  }
}

export { UserUtil };
