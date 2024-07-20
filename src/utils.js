class UserUtil {
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

  getUserRole(){
    const data = JSON.parse(this.getUserData());
    return data.role;
  }

  saveDataToLs(data) {
    if (!data) {
      return;
    }

    window.localStorage.setItem('user', data);
  }
}

export { UserUtil };
