import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
// import { checkToken, getToken } from "./api";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    // const refreshToken = localStorage.getItem("refresh-token");
    setToken(accessToken);
    // if (accessToken && refreshToken) {
    //   setLoading(true);
    //   checkToken(accessToken)
    //     .then((isValid) => {
    //       console.info(isValid);
    //       setToken(accessToken);
    //     })
    //     .catch(async (error) => {
    //       console.error(error);
    //       const newToken = await getToken(refreshToken);
    //       console.log(newToken);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // } else {
    //   setToken(null);
    // }
  }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid justify-content-end">
              <a className="navbar-brand" href="#">
                <Logout setToken={setToken} />
              </a>
            </div>
          </nav>
          <section>
          <Dashboard token={token} />
          </section>
        </>
      )}
    </div>
  );
};

export default App;
