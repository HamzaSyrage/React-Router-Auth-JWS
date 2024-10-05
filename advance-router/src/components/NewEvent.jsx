import { json, redirect } from "react-router-dom";
import EventForm from "./EventForm";

export default function NewEvent() {
  return <EventForm method="POST" event={{}} />;
}
export async function action({ request }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    date: data.get("date"),
    image: data.get("image"),
    description: data.get("description"),
  };
  console.log(eventData);

  const req = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!req.ok) {
    throw json({ massage: "create shit" }, { status: 500 });
  }
  return redirect("..");
}
