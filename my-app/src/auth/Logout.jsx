
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { auth_logout } from '../rtk/slices/auth-slice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const dispatch = useDispatch();
     
  const toPage = useNavigate();

  const HandelLogout = async () => {
    try {
      await dispatch(auth_logout()).unwrap();
      toast.success('logged out successfully')
      toPage("/login");
    } catch (error) {
      console.log(error);
      toast.error('not logged out try again! ')
    }
  };


  return (
    <MdLogout className="w-5 h-6 text-[var(--text-color)] cursor-pointer" onClick={HandelLogout}/>
  )
}
