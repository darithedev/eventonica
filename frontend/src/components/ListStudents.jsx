import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import EventForm from "./Form.jsx";
import Event from "./Event.jsx";

const ListEvents = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const loadEvents = () => {
      fetch("http://localhost:8080/api/events")
        .then((response) => response.json())
        .then((events) => {
          setEvents(events);
        });
    };

    useEffect(() => {
        loadEvents();
    }, [events]);

    return (
        <div className="mybody">

        </div>
    );
};

export default ListEvents;