import React from "react";
import "chart.js/auto";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import "./Dashboard.css";

const Dashboard = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: [0, 1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

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
                    <Doughnut data={data} />
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
                <h3>Your txn amount</h3>
                <div className="chart-wrapper">
                  <div className="chart-inner-wrapper">
                    <Pie data={data} />
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
                <h3>Your txns</h3>
                <div className="chart-wrapper-2">
                  <Line data={lineData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-right-section col-lg-4">
          <div className="right-inner-wrapper">
            <h4 style={{ fontWeight: "bold" }}>Your Donations</h4>
            <div className="txns-wrapper">
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
              <div className="txn-wrapper">
                <div className="flex-wrapper">
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">From</span>:{"  "}
                      <span className="right-span"> 0xa3842x...</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">Amount</span>:{"  "}
                      <span className="right-span">0.005</span>
                    </span>
                  </div>
                  <div className="txn-inner-wrapper">
                    <span className="spann-wrapper">
                      <span className="left-span">Token</span>:{"  "}
                      <span className="right-span"> ETH</span>
                    </span>
                    <span className="spann-wrapper">
                      <span className="left-span">USD</span>:{" "}
                      <span className="right-span">5$</span>
                    </span>
                  </div>
                </div>
                <span className="spann-wrapper">
                  <span className="left-span">Received</span>:{"  "}
                  <span className="right-span"> 11:35 21 Sept. 2022</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
