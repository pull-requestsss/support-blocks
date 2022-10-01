import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Profile from "../../components/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { connectWallet, _getSignature } from "../../api/web3";
import {
  getAnalyticsData,
  getTxnData,
  getUserDataAccount,
  verify,
  verifyJWT,
} from "../../api/web2";
import { useNavigate } from "react-router-dom";

import "./DashboardPage.css";
import Loading from "../../components/Loading/Loading";

const DashboardPage = () => {
  const [selector, setSelector] = useState(1);
  const [txnData, setTxnData] = useState({
    sender: "",
    token: "",
    createdAt: "",
    amountReceived: {
      $numberDecimal: 0,
    },
  });
  const [analData, setAnalData] = useState();
  const [userData, setUserData] = useState({});

  const { provider, signer, account } = useSelector(
    (state) => state.web3Config
  );
  const [JWT, setJWT] = useState(localStorage.getItem("JWT"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const launchApp = async () => {
    var _jwt = JWT;
    var _isNewUser = localStorage.getItem("isNewUser");
    var _signer = signer;
    var _account = account;
    try {
      if (provider == undefined || signer == undefined) {
        const res = await connectWallet(provider, signer, account, dispatch);
        _signer = res._signer;
        _account = res._account;
      }
      if (JWT == undefined || !verifyJWT(_jwt, _account)) {
        const { sig, message } = await _getSignature(_signer, _account);
        const payload = { ...message, signature: sig };
        const res = await verify(payload);
        localStorage.setItem("JWT", res.accessToken);
        setJWT(res.accessToken);
        _jwt = res.accessToken;
        _isNewUser = res.isNewUser;
      }
      localStorage.setItem("isNewUser", _isNewUser);
      if (_isNewUser == true || _isNewUser == "true") {
        navigate("/setup");
        return;
      }

      const _analData = (await getAnalyticsData(_jwt)).data;
      const _txnData = await getTxnData(_jwt);
      const _userData = (await getUserDataAccount(_account)).user;

      console.log(_txnData);

      setAnalData(_analData);
      setTxnData(_txnData);
      setUserData(_userData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      window.alert(error);
      navigate("/");
    }
  };

  useEffect(() => {
    launchApp();
  }, []);

  const isReady = () => {
    return isLoading;
  };

  if (isReady()) return <Loading />;

  return (
    <div className="dashboard-outer-wrapper">
      <div className="container">
        <div className="dash-selector">
          <button
            className={`selector-btn ${selector == 1 ? "selector-active" : ""}`}
            onClick={() => setSelector(1)}
          >
            Dashboard
          </button>
          <button
            className={`selector-btn ${selector == 0 ? "selector-active" : ""}`}
            onClick={() => setSelector(0)}
          >
            Profile
          </button>
        </div>
        {selector == 0 ? (
          <div className="profile">
            <Profile userData={userData} />
          </div>
        ) : (
          <div className="dash">
            <Dashboard analData={analData} txnData={txnData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
