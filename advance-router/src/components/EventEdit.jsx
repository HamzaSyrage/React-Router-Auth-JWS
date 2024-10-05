import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventForm from "./EventForm";

export default function EventEdit() {
  const data = useRouteLoaderData("event-loader");
  return <EventForm method="PATCH" event={data.event} />;
}
export async function action(state) {
  console.log(state.request);
  const data = await state.request.formData();
  console.log(data);
  const eventData = {
    date: data.get("date"),
    title: data.get("title"),
    image: data.get("image"),
    description: data.get("description"),
  };
  const req = await fetch(
    "http://localhost:8080/events/" + state.params.eventID,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }
  );

  console.log(req);
  if (!req.ok) {
    throw json({ massage: "action shit" }, { status: 500 });
  }

  return redirect("..");
}
