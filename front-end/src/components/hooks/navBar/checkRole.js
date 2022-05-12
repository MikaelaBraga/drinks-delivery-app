import { useEffect, useState } from 'react';

function useCheckRole() {
  const [isUser, setIsUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { role } = JSON.parse(localStorage.getItem(('user')));

  useEffect(() => {
    try {
      switch (role) {
      case 'customer':
        setIsUser(true);
        break;
      case 'seller':
        setIsSeller(true);
        break;
      case 'administrator':
        setIsAdmin(true);
        break;
      default:
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }, [role]);

  return [isUser, isSeller, isAdmin];
}

export default useCheckRole;
