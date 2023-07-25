import { BiCheck } from "react-icons/bi";
import "./Service.css";

const Service = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>
      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>Backend</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Custom Server-Side Solutions</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Database Management</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Authentication and Authorization</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Integration with Third-Party Services</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Performance Tuning</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Testing & QA</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Continuous Integration/Continuous Deployment (CI/CD)</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Dedicated Support</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Documentation</p>
            </li>
          </ul>
        </article>
        {/* END OF UI/UX */}
        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Responsive Web Design</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>User Experience (UX) & User Interface (UI) Design</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Single Page Applications (SPAs)</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>E-commerce Development</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Website Performance Optimization</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Cross-Browser Compatibility</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Maintenance & Support</p>
            </li>
          </ul>
        </article>
        {/* END OF Web Development */}
        <article className="service">
          <div className="service__head">
            <h3>Content Creation</h3>
          </div>
          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Blog Posts and Articles</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Website Content</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Technical Documentation</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Newsletters and Email Campaigns:</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Copy Editing and Proofreading</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Product Reviews and Tutorials</p>
            </li>
          </ul>
        </article>
        {/* END OF Content Creation */}
      </div>
    </section>
  );
};

export default Service;
