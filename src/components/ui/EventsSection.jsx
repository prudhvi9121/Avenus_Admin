import { useState, memo } from 'react';

const events = [
  {
    title: "Children's Day",
    description:
      "A joyous celebration of childhood filled with fun activities, games, and performances by our young stars.",
    image: "/Pics/group-of-happy-indian-children.jpg",
  },
  {
    title: "Yellow Day",
    description:
      "A vibrant celebration where students and teachers come together dressed in yellow to spread happiness and positivity.",
    image: "/Pics/Yellow-day.jpeg",
  },
  {
    title: "Teachers' Day",
    description:
      "A special day dedicated to honoring our educators and expressing gratitude for their invaluable contribution to shaping young minds.",
    image: "/Pics/gettyimages-1343473005-612x612.jpg",
  },
];

const EventCard = ({ event, index, onExpand }) => {
  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden group h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={onExpand}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <h3 className="text-white text-xl font-bold mb-2">
          {event.title}
        </h3>
        <p className="text-white/90 text-sm line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  );
};

// Simplified modal display
const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              {event.title}
            </h3>
            <p className="text-lg text-gray-200">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsSection = memo(() => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  return (
    <section id="events" className="py-20 relative">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/Vector2.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 via-green-500 via-blue-500 to-blue-600 text-transparent bg-clip-text text-gray-900 mb-4">
            Events & Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the vibrant culture and traditions that make our school
            community special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard 
              key={event.title} 
              event={event} 
              index={index} 
              onExpand={() => setExpandedEvent(event)}
            />
          ))}
        </div>
        <div className="col-span-1 mt-10 border-b border-black-300"></div>
      </div>

      {expandedEvent && (
        <EventModal 
          event={expandedEvent} 
          onClose={() => setExpandedEvent(null)} 
        />
      )}
    </section>
  );
});

export default EventsSection;