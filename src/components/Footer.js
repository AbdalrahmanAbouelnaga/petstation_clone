import logo from "../website_logo.png";
import phone from '../fcall-icon.png'
import email from '../fmail-icon.png'
import fb from '../ffb-icon.png'
import inst from '../fin-icon.png'
import afterPay from '../afterpay-logo.jpg'
import payment from '../payment-methods.png'


export const Footer = ({navData}) => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="start">
              <img loading="lazy" src={logo} alt="" />
              <p>Pet Station is a 100% Australian owned & operated small family online business providing your favourite brands at affordable prices.</p>
            </div>
            <div className="middle">
              <div className="list">
                <h4 className="list-title">Categories</h4>
                <ul className="footer-list">
                  {navData.animals?navData.animals.map((animal,index)=>(
                    <li className="footer-list-item" key={index}><a href={animal.url}>{animal.title}</a></li>
                  )):null}
                  <li className="footer-list-item"><a href="/specials">Specials</a></li>
                  <li className="footer-list-item"><a href="/brands">brands</a></li>
                </ul>
              </div>
              <div className="list">
                    <h4 className="list-title">Information</h4>
                    <ul className="footer-list">
                      <li className="footer-list-item"><a href="/faq">FAQ</a></li>
                      <li className="footer-list-item"><a href="/about">About us</a></li>
                      <li className="footer-list-item"><a href="/contact">contact us</a></li>
                      <li className="footer-list-item"><a href="/delivery">delivery policy</a></li>
                      <li className="footer-list-item"><a href="/returns">returns policy</a></li>
                      <li className="footer-list-item"><a href="/privacy">privacy policy</a></li>
                      <li className="footer-list-item"><a href="/terms-conditions">terms & conditions</a></li>
                      <li className="footer-list-item"><a href="/blog">blog</a></li>
                    </ul>
                </div>
            </div>
            <div className="end">
              <h4 className="list-title">need help?</h4>
              <div className="contact" id="phone">
                <div className="icon">
                  <img loading="lazy" src={phone} alt="" />
                </div>
                <div className="desc">
                  <p>call us on</p>
                  <h4><a>(02) 6040 0604</a></h4>
                </div>
              </div>
              <div id="email" className="contact">
                    <div className="icon"><img src={email} alt="" /></div>
                    <div className="desc">
                      <p>E-mail Address</p>
                      <h4><a>sales@petstation.com.au</a></h4>
                    </div>
              </div>
              <ul id="social" className="contact">
                    <li>
                      <a href="https://www.facebook.com/petstationaus" target="_blank"><img loading="lazy" src={fb} alt="" /></a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/petstationaus" target="_blank"><img loading="lazy" src={inst} alt="" /></a>
                    </li>
              </ul>
            </div>
        </div>
        <div className="container">
          <hr />
        </div>
        <div className="container">
          <div className="copyright">
            <p>Copyright © 2023 Pet Station. All rights reserved</p>
            <a href="https://www.petstation.com.au/afterpay/">
              <img src={afterPay} loading="lazy" alt="" />
            </a>
            <img src={payment} loading="lazy" width={183} alt="" />
          </div>
        </div>
    </footer>
  )
}
