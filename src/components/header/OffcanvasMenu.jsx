import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose, categories }) => {
  return (
    <Offcanvas
      show={ofcshow}
      onHide={ofcHandleClose}
      placement="end"
      className="offcanvas-menu"
    >
      <Offcanvas.Header
        closeButton
        className="close-offcanvasmeu"
      ></Offcanvas.Header>
      <div className="side-nav">
        <div className="side-nav-inner nicescroll-container">
          <form action="#" className="side-nav-search-form">
            <div className="form-group search-field">
              <input
                type="text"
                className="search-field"
                name="search-field"
                placeholder="Search..."
              />
              <button className="side-nav-search-btn">
                <i className="fas fa-search" />
              </button>
            </div>
          </form>
          <div className="side-nav-content">
            <div className="row ">
              <div className="col-lg-6">
                <ul className="main-navigation side-navigation list-inline flex-column">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/latest">
                      <a>Latest</a>
                    </Link>
                  </li>
                  {categories.map((category, index) => (
                    <li key={`offcanvas-category-${index}`}>
                      <Link href={`/categories/${category}`}>
                        <a>{category}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="axil-contact-info-inner">
                  <h5 className="h5 m-b-xs-10">Contact Information</h5>
                  <div className="axil-contact-info">
                    <address className="address">
                      <p className="m-b-xs-30 mid grey-dark-three">
                        Theodore Lowe, Ap #867-859
                        <br />
                        Sit Rd, Azusa New York
                      </p>
                      <div className="h5 m-b-xs-5">
                        We&apos;re Available 24/ 7. Call Now.
                      </div>
                      <div>
                        <a className="tel" href="tel:8884562790">
                          <i className="fas fa-phone" />
                          (888) 456-2790
                        </a>
                      </div>
                      <div>
                        <a className="tel" href="tel:12125553355">
                          <i className="fas fa-phone" />
                          +1 212 555 3355
                        </a>
                      </div>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="social-share">
              <a href={SocialLink.fb.url}>
                <i className={SocialLink.fb.icon} />
              </a>
              <a href={SocialLink.twitter.url}>
                <i className={SocialLink.twitter.icon} />
              </a>
              <a href={SocialLink.instagram.url}>
                <i className={SocialLink.instagram.icon} />
              </a>
              <a href={SocialLink.linked.url}>
                <i className={SocialLink.linked.icon} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
};

export default OffcanvasMenu;
