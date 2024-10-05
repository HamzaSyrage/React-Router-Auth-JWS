import { NavLink, Outlet, useNavigation } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div className="load layout">
        <span className="loading">loading...</span>
      </div>
    );
  }
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to={"/"}
                end
                className={(status) =>
                  status.isActive ? classes.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/events"}
                className={(status) =>
                  status.isActive ? classes.active : undefined
                }
              >
                Events
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
