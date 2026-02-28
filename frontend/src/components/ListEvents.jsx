import { useState, useEffect, useReducer } from "react";
import EventForm from "./Form.jsx";
import Event from "./Event.jsx";
import '../components/ListEvents.css'

function reducer(state, action) {
    if (action.type === 'updated_field') {
        return {
            ...state,
            search: action.search
        };
    }
    if (action.type === 'updated_query') {
        return {
            ...state,
            query: action.query
        };
    }
    if (action.type === 'all_events') {
        return {
            search: 'all',
            query: ''
        };
    }

    throw Error('Unknown action.');
}

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
    
    const [state, dispatch] = useReducer(reducer, {
        search: 'all',
        query: ''
    });

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

    const filterForEvents = events.filter((event) => {
        const q = state.query.toLowerCase();

        if (state.search === "all"){
            return true;
        } else if (state.search === "event_name") {
            return event.event_name.toLowerCase().includes(q);
        } else if (state.search === "category") {
            return event.category.toLowerCase().includes(q);
        } else if (state.search === "date") {
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
                        <div className="mini-nav">
                            <label>Search </label>
                            <select
                                id="dropdown"
                                value={state.search}
                                onChange={(event) => {
                                    dispatch({
                                        type: 'updated_field',
                                        search: event.target.value
                                    });
                                }}
                            >
                                {searchOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))} 
                            </select>
                            <input id="search-box"
                                type="text"
                                placeholder="What event are you searching for?"
                                value={state.query}
                                onChange={(event) => {
                                    dispatch({
                                        type: 'updated_query',
                                        query: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <button id="add-button" onClick={() => setIsNewEvent(true)}>Add Event</button>
                        <ul
                            style={{ listStyle: "none" }}
                        >
                            {filterForEvents.map((event) => {
                                return (
                                <li className="events-card" key={event.id}>
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