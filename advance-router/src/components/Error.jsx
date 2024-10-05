import { useRouteError, Link } from "react-router-dom";
import classes from "./Error.module.css";
import MainNavigation from "./MainNavigation";
export default function Error() {
  const error = useRouteError();

  let massage = "page not found";
  let status = "404";
  if (error.status === 501 || error.status === 500) {
    massage = error.data.massage;
    status = error.status;
  }
  return (
    <>
      <MainNavigation />
      <div className={classes.error}>
        <h1>Application Error!</h1>
        <p>
          error
          <span> {status} </span>
          {massage}
        </p>
        <Link to="/">back Home</Link>
      </div>
    </>
  );
}
