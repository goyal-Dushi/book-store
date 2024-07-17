import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../components/contexts/alertContext';
import { UserAPI } from '../api';
import { UserUtil } from '../utils';
import SellerProfile from '../components/profiles/SellerProfile';
import UserProfile from '../components/profiles/UserProfile';

function Profile() {
  const { dispatchAlert } = useContext(AlertContext);
  const [userData, setUserData] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const user = new UserUtil();
        const response = await UserAPI.getInventory(user.getUserId());

        setInventoryData(response.data);
        setUserData(user);
      } catch (err) {
        dispatchAlert({ show: true, msg: err.message, type: err.type });
      }
    })();
  }, []);

  if (!userData || !inventoryData) {
    return null;
  }

  if (userData.role === 'vendor') {
    return (
      <SellerProfile sellerData={userData} inventoryData={inventoryData} />
    );
  }

  return <UserProfile userData={userData} inventoryData={inventoryData} />;
}

export default Profile;
