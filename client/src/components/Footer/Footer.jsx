import React from "react";
import "./Footer.css";
import { Icon } from "@iconify/react";
const Footer = () => {
  return (
    <>
      <div id="footer">
        <div className="copy-right">
          <div className="icons-container">
            <a
              href="https://github.com/pull-requestsss/support-blocks"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="akar-icons:github-fill" color="#000000" />
            </a>
          </div>
          <div className="cr">
            &copy; Copyright{" "}
            <strong>
              <span>Support Blocks</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
