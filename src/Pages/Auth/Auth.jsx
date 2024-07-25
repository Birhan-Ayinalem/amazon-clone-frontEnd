import { useContext, useState } from 'react'
import classes from './Auth.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from './../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from './../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';

const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })

  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const naveStateData = useLocation()
  console.log(naveStateData)
  
  console.log(user)

  const authHandler = async(e) => {
    e.preventDefault();
    // console.log(e)
    // console.log(e.target.name)
    if (e.target.name === "signIn") {
      // start authentication at firebase
      setLoading({...loading, signIn:true})
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        // console.log(userInfo)
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({ ...loading, singIn: false });
        navigate(naveStateData?.state?.redirect || "/")
      }).catch((err) => {
        console.log(err)
        setError(err.message)
        setLoading({ ...loading, singIn: false });
      })
      
    } else {
      setLoading({...loading, signUp:true});
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        // console.log(userInfo)
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
        navigate(naveStateData?.state?.redirect || "/");
      }).catch((err) => {
        console.log(err)
        setError(err.message) 
        setLoading({ ...loading, signUp: false });
      })
    }
  }

  console.log(email, password)

    return (
      <section className={classes.login}>
        {/* logo  */}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt=""
          />
        </Link>
        {/* form  */}
        <div className={classes.login__container}>
          <h1>Sign-in</h1>
          {
            naveStateData?.state?.msg && (<small style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}>
            {naveStateData?.state?.msg}
          </small>)
          }
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="signIn"
              className={classes.login__signInButton}
            >
              {loading.signIn ? (
                <ClipLoader color="#318a4a" size={18} />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          {/* agreement  */}
          <p>
            By signing-in you agree to the amazon cloned conditions of Use &
            Sell. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          {/* create account btn*/}
          <button
            type="submit"
            onClick={authHandler}
            name="signUp"
            className={classes.login__registerButton}
          >
            {loading.signUp ? (
              <ClipLoader color="#318a4a" size={18} />
            ) : (
              "Create your  Fake Amazon Account"
            )}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </div>
      </section>
    );
}

export default Auth
