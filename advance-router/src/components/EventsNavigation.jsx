import { Link, NavLink, Outlet } from "react-router-dom";
import classes from "./EventsNavigation.module.css";

export default function EventsNavigation() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/events"
                end
                className={(status) =>
                  status.isActive ? classes.active : undefined
                }
              >
                All Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events/new"
                end
                className={(status) =>
                  status.isActive ? classes.active : undefined
                }
              >
                New Event
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
