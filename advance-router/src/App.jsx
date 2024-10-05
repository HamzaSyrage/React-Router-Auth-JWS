import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation.jsx";
import EventsList, { eventsLoader } from "./components/EventsList.jsx";
import EventItem, {
  action as deleteAction,
  eventLoader,
} from "./components/EventItem.jsx";
import Error from "./components/Error.jsx";
import EventsNavigation from "./components/EventsNavigation.jsx";
import Home from "./components/Home.jsx";
import EventEdit, { action as editAction } from "./components/EventEdit.jsx";
import NewEvent, { action as createAction } from "./components/NewEvent.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainNavigation />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsNavigation />,
        children: [
          {
            path: "",
            loader: eventsLoader,
            element: <EventsList />,
          },
          {
            path: ":eventID",
            id: "event-loader",
            action: deleteAction,
            loader: eventLoader,
            children: [
              {
                path: "",
                element: <EventItem />,
                children: [
                  { path: "", element: <EventsList />, loader: eventsLoader },
                ],
              },
              {
                path: "edit",
                action: editAction,
                element: <EventEdit />,
              },
            ],
          },

          {
            path: "new",
            action: createAction,
            element: <NewEvent />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
