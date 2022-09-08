import React, { useState, useEffect, useRef } from "react";
import WAVES from "vanta/dist/vanta.waves.min.js";
import "./Hero.css";

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x11314a,
          waveSpeed: 0.3,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section class="ud-hero" ref={myRef} id="home">
      <div class="container">
        <div class="row hero-flex">
          <div class="col-lg-12 in-hero">
            <div class="ud-hero-content wow fadeInUp" data-wow-delay=".2s">
              <h1 class="ud-hero-title">
                Supporting your creative ideas was never this easy.
              </h1>
              <div className="hero-gif-wrapper">
                <img
                  src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-animated.gif?v=023"
                  alt="ETH"
                  className="hero-gif"
                />
              </div>
              <p class="ud-hero-desc">Fueled by Ethereum</p>
            </div>
          </div>
          <div className="col-lg-6 input-wrapper">
            <div className="input-inner-wrapper">
              <span className="input-element-1">buymeacryptea.com/</span>
              <input type="text" placeholder="yourname" />
              <button className="ud-main-btn ud-white-btn">
                Start my page
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
