import classes from "./EventItem.module.css";
import {
  json,
  Link,
  Outlet,
  redirect,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";

export default function EventItem() {
  const res = useRouteLoaderData("event-loader");
  const param = useParams();
  const event = res.event;
  const submit = useSubmit();
  if (!event.image.includes("http")) {
    event.image = "../" + event.image;
  }

  async function startDeleteHandler() {
    const sure = window.confirm("are you sure");
    console.log(sure);
    if (sure) {
      submit({}, { method: "delete" });
    }
  }
  return (
    <>
      <article className={classes.event}>
        <img src={event.image} alt={event.title} />
        <h1>{event.title}</h1>
        <time>{event.date}</time>
        <p>
          <span>id: {param.eventID} </span>
          {event.description}
        </p>
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      </article>
      <Outlet />
    </>
  );
}
export async function eventLoader(state) {
  const res = await fetch(
    "http://localhost:8080/events/" + state.params.eventID
  );

  if (!res.ok) {
    throw json({ massage: "failed to fetch event item data" }, { status: 501 });
  }
  return res;
}
export async function action({ params }) {
  console.log(params);
  const req = await fetch("http://localhost:8080/events/" + params.eventID, {
    method: "DELETE",
  });
  console.log(req);
  if (!req.ok) {
    throw json({ massage: "failed to fetch event item data" }, { status: 501 });
  }
  return redirect("..");
}
