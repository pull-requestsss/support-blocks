import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import "./Dashboard.css";
import constants from "../../constants.json";

const Dashboard = ({ analData, txnData }) => {
  const [countryData, setCountryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });
  const [temporalData, setTemporalData] = useState({
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ],
    datasets: [
      {
        label: "No of Users",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ],
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  });
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];
  const [tokenData, setTokenData] = useState({
    labels: ["ETH", "USDT", "WETH"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  });
  const [txns, setTxns] = useState({
    sender: "",
    token: "",
    createdAt: "",
    amountReceived: {
      $numberDecimal: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    try {
      const _analData = analData;
      _setCountryData(_analData.countryData);
      _setTimeData(_analData.hourlyData);
      const _txnData = txnData;
      setTxns(_txnData.txns);
      _setTxnData(_txnData.txns);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      window.alert(error);
      setIsLoading(false);
    }
  };

  const _setTxnData = (_data) => {
    const temp = tokenData;
    const value = {
      "0x0000000000000000000000000000000000000000": 0,
      "0x8b118cCe785fa0f54C43b178717f2E12Aaab86eD": 1,
      "0x3286513f435cDdf55f86f707c67835D7D16c4d71": 2,
    };
    for (let i = 0; i < _data.length; i++) {
      var _temp = _data[i];
      var idx = value[_temp.token];
      temp.datasets[0].data[idx] += Number(_temp.amountReceived.$numberDecimal);
    }
    setTokenData(temp);
  };

  const _setTimeData = (_data) => {
    const _timeData = temporalData;
    for (let i in _data) {
      _timeData.datasets[0].data[i - 1] += _data[i];
    }
    setTemporalData(_timeData);
  };

  const _setCountryData = (_data) => {
    const MAX = 5;
    var curr = 0;
    var others = 0;
    var _countryData = countryData;
    for (let i in _data) {
      if (curr == MAX || i == "unknown") {
        others += _data[i];
      } else {
        _countryData = {
          labels: [..._countryData.labels, i],
          datasets: [
            {
              data: [..._countryData.datasets[0].data, _data[i]],
              backgroundColor: [
                ..._countryData.datasets[0].backgroundColor,
                colors[_countryData.datasets[0].backgroundColor.length],
              ],
              hoverOffset: 4,
            },
          ],
        };
        curr++;
      }
    }
    if (others > 0) {
      _countryData = {
        labels: [..._countryData.labels, "Others"],
        datasets: [
          {
            data: [..._countryData.datasets[0].data, others],
            backgroundColor: [
              ..._countryData.datasets[0].backgroundColor,
              colors[colors.length - 1],
            ],
            hoverOffset: 4,
          },
        ],
      };
    }
    setCountryData(_countryData);
  };

  const getToken = (_token) => {
    if (_token == constants.ETH) return "ETH";
    if (_token == constants.WETH) return "WETH";
    if (_token == constants.USDT) return "USDT";
  };

  const getAccount = (__account) => {
    return __account.substring(0, 8) + "...";
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) return <>Loading</>;

  return (
    <div className="dash-outer-wrapper">
      <div className="row">
        <div className="dash-left-section col-lg-8">
          <div className="left-outer-wrapper">
            <div className="left-inner-wrapper">
              <div className="chart-block" style={{ marginTop: "2rem" }}>
                <h3>Your txn amount</h3>
                <div className="chart-wrapper">
                  <div className="chart-inner-wrapper">
                    <Doughnut data={tokenData} />
                  </div>
                  <div className="chart-span-wrapper">
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tenetur soluta consequuntur illum. Adipisci, excepturi ad?
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="chart-block">
                <h3>Regions</h3>
                <div className="chart-wrapper">
                  <div className="chart-inner-wrapper">
                    <Pie data={countryData} />
                  </div>
                  <div className="chart-span-wrapper">
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Explicabo, perferendis accusamus ex incidunt sit sequi
                      recusandae, voluptates, labore possimus expedita beatae
                      veniam tempore quas quod.
                    </span>
                  </div>
                </div>
              </div>
              <div className="chart-block-2">
                <h3>Temporal Data</h3>
                <div className="chart-wrapper-2">
                  <Bar data={temporalData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-right-section col-lg-4">
          <div className="right-inner-wrapper">
            <h4 style={{ fontWeight: "bold" }}>Your Donations</h4>
            <div className="txns-wrapper">
              {txns.map((txn, index) => {
                return (
                  <div className="txn-wrapper" key={index}>
                    <div className="flex-wrapper">
                      <div className="txn-inner-wrapper">
                        <span className="spann-wrapper">
                          <span className="left-span">From</span>:{"  "}
                          <span className="right-span">
                            {getAccount(txn.sender)}
                          </span>
                        </span>
                        <span className="spann-wrapper">
                          <span className="left-span">Amount</span>:{"  "}
                          <span className="right-span">
                            {txn.amountReceived.$numberDecimal}
                          </span>
                        </span>
                      </div>
                      <div className="txn-inner-wrapper">
                        <span className="spann-wrapper">
                          <span className="left-span">Token</span>:{"  "}
                          <span className="right-span">
                            {getToken(txn.token)}
                          </span>
                        </span>
                      </div>
                    </div>
                    <span className="spann-wrapper">
                      <span className="left-span">Received</span>:{"  "}
                      <span className="right-span">
                        {new Date(txn.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
