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
    const [isNewEvent, setIsNewEvent] = useState(false);

    const searchOptions = [
        { value: "all", label: "All Events" },
        { value: "event_name", label: "Event Name" },
        { value: "category", label: "Category" },
        { value: "date", label: "Date (Month)" }
    ];
    const [search, setSearch] = useState("all");
    const [query, setQuery] = useState("");
    

    useEffect(() => {
        loadEvents();
    }, []);

    const onSaveEvent = (newEvent) => {
      setEvents((events) => [...events, newEvent]);
    };

    const updateEvent = (updatedEvent) => {
      setEvents((events) =>
        events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    };

    const onDelete = (event) => {
        return fetch(`http://localhost:8080/api/event/${event.id}`, {
            method: "DELETE"
        }).then((response) => {
            if (response.ok) {
                loadEvents();
            }
        });
    };

    const onUpdate = (toUpdateEvent) => {
        setEditingEvent(toUpdateEvent);

    };

    const filterForEvents = events.filter((event) => {
        const q = query.toLowerCase();

        if (search === "all"){
            return true;
        } else if (search === "event_name") {
            return event.event_name.toLowerCase().includes(q);
        } else if (search === "category") {
            return event.category.toLowerCase().includes(q);
        } else if (search === "date") {
            const d = new Date(event.date);
            const month = d.toLocaleDateString("en-US", { month: "long" }).toLowerCase();
            return month.includes(q);
        }
    });

    return (
        <div className="mybody">
            {(isNewEvent || editingEvent)
                ? (<EventForm
                    key={editingEvent ? editingEvent.id : null}
                    onSaveEvent={onSaveEvent}
                    editingEvent={editingEvent}
                    onUpdateEvent={updateEvent}
                    setIsNewEvent={setIsNewEvent}
                    setEditingEvent={setEditingEvent}
                />
                ) : (<div className="list-events">
                        <h2>Eventonica Events</h2>
                        <div>
                            <label>Search </label>
                            <select
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            >
                                {searchOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="What event are you searching for?"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </div>
                        <button onClick={() => setIsNewEvent(true)}>Add Event</button>
                        <ul>
                            {filterForEvents.map((event) => {
                                return (
                                <li key={event.id}>
                                    {" "}
                                    <Event
                                        event={event}
                                        toDelete={onDelete}
                                        toUpdate={updateEvent}
                                        onEdit={() => setEditingEvent(event)}
                                    />
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default ListEvents;