import { Suspense } from "react";
import classes from "./EventsList.module.css";
import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
export default function EventsList() {
  const res = useLoaderData();
  const events = res.events;

  return (
    <Suspense fallback={<div className={classes.event}>loading...</div>}>
      <Await resolve={events}>
        {(events) => {
          return (
            <div className={classes.events}>
              <h1>All Events</h1>
              <ul className={classes.list}>
                {events.map((event) => (
                  <li key={event.id} className={classes.item}>
                    <Link to={`/events/${event.id}`}>
                      <img src={event.image} alt={event.title} />
                      <div className={classes.content}>
                        <h2>{event.title}</h2>
                        <time>{event.date}</time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
async function loader() {
  const res = await fetch("http://localhost:8080/events");
  if (!res.ok) {
    throw json({ massage: "failed to fetch events list" }, { status: 501 });
  }
  const event = await res.json();
  // console.log(event.events);
  return event.events;
}
export function eventsLoader() {
  return defer({ events: loader() });
}
