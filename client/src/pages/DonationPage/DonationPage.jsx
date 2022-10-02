import React, { useState, useEffect } from "react";
import constants from "../../constants.json";
import "./DonationPage.css";
import logo from "../../assets/singleBlock.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams, useNavigate } from "react-router-dom";
import { getRates, getUserData, sendAnalytics } from "../../api/web2";
import { getApproval, getContract, performTxn } from "../../api/web3";
import Modal from "react-bootstrap/Modal";
import Loading from "../../components/Loading/Loading";

const DonationPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [userData, setUserData] = useState({
    walletAddress: "",
    featuredUrl: "",
    industry: "",
    intro: "",
    slug: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(constants.ETH);
  const [rates, setRates] = useState({
    ETH: "0",
    WETH: "0",
    DAI: "1",
    USDT: "1",
  });
  const [show, setShow] = useState(false);
  const [txn, setTxn] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [contract, setContract] = useState(undefined);
  const [weth, setWeth] = useState(undefined);
  const [usdt, setUsdt] = useState(undefined);
  const [isReady, setIsReady] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getTokenImg = () => {
    if (token == constants.ETH) return constants.ethLogo;
    if (token == constants.WETH) return constants.wethLogo;
    if (token == constants.DAI) return constants.daiLogo;
    if (token == constants.USDT) return constants.usdtLogo;
  };

  const getTokenName = () => {
    if (token == constants.ETH) return "ETH";
    if (token == constants.WETH) return "WETH";
    if (token == constants.DAI) return "DAI";
    if (token == constants.USDT) return "USDT";
  };

  const getData = async () => {
    try {
      const _userData = await getUserData(slug);
      const _rates = await getRates();
      setRates(_rates);
      setUserData(_userData.user);
      setIsReady(true);
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        navigate("/notFound");
      } else {
        window.alert(error);
        navigate("/");
      }
    }
  };

  const calculateTokenAmount = () => {
    const amt = calculateAmount();
    if (token == constants.ETH || token == constants.WETH) {
      return (amt / rates.ETH).toFixed(4);
    }
    return amt;
  };

  const calculateAmount = () => {
    return quantity * 5;
  };

  const getAddress = (address) => {
    return address.substr(0, 12) + "...";
  };

  const makeTransfer = async () => {
    try {
      var _contract = contract;
      var _weth = weth;
      var _usdt = usdt;
      if (contract == undefined) {
        const res = await getContract();
        _contract = res.contract;
        _weth = res.weth;
        _usdt = res.usdt;
        setContract(_contract);
        setWeth(_weth);
        setUsdt(_usdt);
      }
      if (token != constants.ETH) {
        const _txn = await getApproval(
          token == constants.USDT ? _usdt : _weth,
          calculateAmount()
        );
        setTxn(_txn.hash);
        handleShow();
        const receipt = await _txn.wait();
        handleClose();
      }
      const _txn = await performTxn(
        _contract,
        token,
        calculateTokenAmount(),
        userData.walletAddress
      );
      setTxn(_txn.hash);
      handleShow();
      const receipt = await _txn.wait();
      handleClose();
      setShowSuccess(true);
      await sendAnalytics(userData.walletAddress);
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <div className="main-content">
      <div className="container mt-15">
        <div className="row">
          {showSuccess ? (
            <div className="alert alert-success success-message" role="alert">
              <span>
                The donation has successfully reached your favorite creator
              </span>
              <span>Thank you for your support !! ❤️</span>
            </div>
          ) : null}

          <div className="col-xl-5 order-l-1 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center dp-wrapper">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <img
                        src="https://disaster-analytics.com/wp-content/uploads/2014/05/blank-profile-picture-973460_640.png"
                        className="rounded-circle"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="text-center">
                  <h4>{getAddress(userData.walletAddress)}</h4>
                  <div className="h5 font-weight-300">
                    supportblocks.club/
                    <i className="ni location_pin mr-2">{userData.slug}</i>
                  </div>
                  <div className="h5 mt-4">{userData.industry}</div>
                  <hr className="my-4" />
                  <p>{userData.intro}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-7 order-l-2">
            <div className="main-card card shadow">
              <div className="donations-wrapper">
                <h3>
                  Buy <i>{getAddress(userData.walletAddress)}</i> a Block
                </h3>
              </div>
              <div className="counter-wrapper">
                <img src={logo} alt="" className="counter-img" />
                <span className="mult">x</span>
                <span
                  className={`donation-preset ${quantity == 1 ? "active" : ""}`}
                  onClick={() => setQuantity(1)}
                >
                  1
                </span>
                <span
                  className={`donation-preset ${quantity == 3 ? "active" : ""}`}
                  onClick={() => setQuantity(3)}
                >
                  3
                </span>
                <span
                  className={`donation-preset ${quantity == 5 ? "active" : ""}`}
                  onClick={() => setQuantity(5)}
                >
                  5
                </span>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="token-wrapper">
                <img
                  src={getTokenImg()}
                  alt=""
                  className={`${token == constants.WETH ? "small-img" : ""}`}
                  style={{ width: "3.5rem", margin: "1rem 3rem" }}
                />
                <DropdownButton
                  key={1}
                  id={`dropdown-button-drop-${1}`}
                  size="lg"
                  title={getTokenName()}
                  variant="secondary"
                >
                  <Dropdown.Item onClick={() => setToken(constants.ETH)}>
                    Ethereum
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setToken(constants.WETH)}>
                    Wrapped Eth
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setToken(constants.USDT)}>
                    Tether stable coin
                  </Dropdown.Item>
                </DropdownButton>
              </div>

              <div className="tea-amount">1 block = $ 5</div>
              <div className="tea-amount1">{`$ ${calculateAmount()} ≈ ${calculateTokenAmount()} ${getTokenName()}`}</div>

              <button
                className="main-btn"
                style={{ margin: "0.1rem 1rem" }}
                onClick={makeTransfer}
              >
                Support ${calculateAmount()}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div className="modal-inner-wrapper">
          <div
            className="spinner-border text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
          <span>Please wait while your transaction is processing...</span>
          <span>
            see on etherscan{" "}
            <a href={`https://goerli.etherscan.io/tx/${txn}`} target="_blank">
              {txn.substring(0, 8) + "..."}
            </a>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default DonationPage;
