import { Divider, Layout } from "antd";
import classNames from "classnames/bind";
import React, { SFC } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/footer.module.less";

const { Footer } = Layout;
const cx = classNames.bind(styles);

const PageFooter: SFC<{}> = () => {
  return (
    <Footer className={cx("footer")}>
      <Divider className={cx("horizontal-divider")} type="horizontal" />
      <small>
        <p className={cx("paragraph")}>
          <Link to="/impressum">Impressum</Link>
          <span> &middot; </span>
          <Link to="/bedingungen">Datenschutz &amp; AGB</Link>
          <span> &middot; </span>
          <Link to="/hilfe">Hilfe</Link>
        </p>
        <p className={cx("paragraph")}>
          <span> &copy;{new Date().getFullYear()} &middot; </span>
          <a
            href="https://github.com/yourChoiceHO"
            target="_blank"
            rel="noopener noreferrer"
          >
            yourChoice HO
          </a>
        </p>
        <p className={cx("paragraph")}>
          Im (fiktionalen) Auftrag der{" "}
          <a
            href="https://www.bundesregierung.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deutschen Bundesregierung
          </a>
        </p>
      </small>
    </Footer>
  );
};

export default PageFooter;
