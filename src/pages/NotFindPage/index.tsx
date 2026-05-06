import { Link } from "react-router-dom";

import style from "./NotFindPage.module.less";

export default function NotFindPage() {
  return (
    <div className={style["not-find-page"]}>
      <h1>Page not found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}
