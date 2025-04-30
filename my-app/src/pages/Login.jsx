import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {  useNavigate } from "react-router-dom";
import { auth_login, messageClear } from '../rtk/slices/auth-slice';
import toast from "react-hot-toast";
import { BarLoader, DotLoader } from "react-spinners";
import Logo from '../ui/Logo'
import { OverrideStyle } from '../utils/helpers';


export default function Login() {

  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage, role, isLogin } = useSelector(
    (state) => state.auth,
  );
  const toPage = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(auth_login(state));
  };


  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  
    if (successMessage && isLogin) {
      toast.success(successMessage);
      dispatch(messageClear()); 
      toPage(role === "admin" ? "/dashboard" : "/");
    }
  }, [errorMessage, successMessage, isLogin, role, dispatch, toPage]);


  if(loader){
    return <div className='flex  justify-center items-center min-h-screen'><DotLoader  color="#1b7ad9" size={70} /></div>
  }
  
  return (
    <div className='min-h-screen bg-[var(--color-bg)] flex flex-col gap-5 text-[var(--color-text)] justify-center  items-center'>
            <Logo/>
            <form onSubmit={submit} >
              <div className=' bg-[var(--color-bg)] flex flex-col gap-5 p-10 text-[var[--text-color]]  border-[var(--color-border)] rounded-md shadow-[var(--color-shadow)]'>
              <div className="flex w-[250px] flex-col gap-1 ">
              <label>Email</label>
              <input
                onChange={inputHandel}
                value={state.email}
                name="email"
                id="email"
                type="email"
                placeholder="email@example.com"
                 
                className=" rounded-md border-[var[--color-border]] shadow-[var[--shadow-color]] text-[var[--text-color]]  p-2 outline bg-[var[--color-bg]]"
              />
            </div>
            <div className="flex w-[250px] flex-col gap-1">
              <label>Password</label>
              <input
                onChange={inputHandel}
                value={state.password}
                name="password"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="password. . . ."
                className="rounded-md border-[var[--color-border]] shadow-[var[--shadow-color]] text-[var[--text-color]]  p-2 outline bg-[var[--color-bg]]"
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="text-l mt-10 w-full cursor-pointer rounded-md bg-sky-500  p-2 text-[var(--text-color)] hover:bg-sky-700 md:mt-4">
              {loader ? <BarLoader cssOverride={OverrideStyle} /> : "Login"}
            </button>
            </div>
          </form>
    </div>
  )
}
