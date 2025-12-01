import React, { useEffect, useState, useRef } from 'react';
import { INDUSTRY_EVENTS } from '../constants';
import { IndustryEvent } from '../types';
import { MapPin, Calendar, Globe, ExternalLink, Navigation, Info, ListFilter, AlertCircle, Loader2 } from 'lucide-react';
import L from 'leaflet';

const Events: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  
  const [selectedEvent, setSelectedEvent] = useState<IndustryEvent | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // StrictMode/Cleanup: Always remove existing map instance before creating a new one
    if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
    }

    try {
        // Default view: Mid-Atlantic to show US and Europe
        const map = L.map(mapRef.current).setView([35, -40], 3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        mapInstance.current = map;

        // Add event markers
        INDUSTRY_EVENTS.forEach(event => {
          const marker = L.marker(event.coordinates)
            .addTo(map)
            .bindPopup(`
                <div class="text-sm font-sans">
                    <strong class="block mb-1 text-slate-900 text-base">${event.title}</strong>
                    <span class="text-slate-600 block mb-2">${event.location}</span>
                </div>
            `);
          
          marker.on('click', () => {
            setSelectedEvent(event);
          });
        });
        
        // Fix Leaflet icon issue
        try {
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            });
        } catch(e) { /* ignore in some envs */ }

        // Fix grey box
        setTimeout(() => {
            if (mapInstance.current) {
                mapInstance.current.invalidateSize();
            }
        }, 200);

    } catch (err) {
        console.error("Map initialization failed:", err);
    }

    return () => {
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    };
  }, []);

  // Handle "Locate Me"
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setPermissionError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setPermissionError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        
        if (mapInstance.current) {
          L.circleMarker([latitude, longitude], {
            radius: 8,
            fillColor: "#3b82f6",
            color: "#fff",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(mapInstance.current)
            .bindPopup("<strong>You are here</strong>")
            .openPopup();

          mapInstance.current.setView([latitude, longitude], 6);
        }
      },
      (error) => {
        setIsLocating(false);
        let msg = "Unable to retrieve your location.";
        if (error.message && error.message.includes("Origin")) {
             msg = "Permission blocked. This feature requires a secure context (HTTPS) or explicitly allowed permission.";
        }
        setPermissionError(msg);
      }
    );
  };

  const handleEventClick = (event: IndustryEvent) => {
    setSelectedEvent(event);
    if (mapInstance.current) {
        mapInstance.current.setView(event.coordinates, 10);
    }
  };

  // Calculate distance
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
       Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
       Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const sortedEvents = userLocation 
    ? [...INDUSTRY_EVENTS].sort((a, b) => {
        const distA = getDistance(userLocation[0], userLocation[1], a.coordinates[0], a.coordinates[1]);
        const distB = getDistance(userLocation[0], userLocation[1], b.coordinates[0], b.coordinates[1]);
        return distA - distB;
      })
    : INDUSTRY_EVENTS;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* MAP SECTION (Top Half) */}
      <div className="relative h-1/2 w-full bg-slate-100 z-0 border-b border-slate-200 group">
        <div ref={mapRef} className="h-full w-full outline-none" style={{ background: '#e5e7eb', isolation: 'isolate' }} />
        
        <div className="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
            <button 
                onClick={() => {
                    if (mapInstance.current) {
                        mapInstance.current.invalidateSize();
                        mapInstance.current.setView([35, -40], 3);
                    }
                }}
                className="bg-white p-3 rounded-full shadow-lg text-slate-700 hover:text-blue-600 transition-colors border border-slate-200"
                title="Reset Map View"
            >
                <Globe className="w-5 h-5" />
            </button>
            <button 
                onClick={handleLocateMe}
                disabled={isLocating}
                className="bg-white p-3 rounded-full shadow-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 border border-slate-200"
                title="Find events near me"
            >
                {isLocating ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <Navigation className="w-5 h-5" />}
            </button>
        </div>
        
        {permissionError && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[400] bg-white text-red-700 px-4 py-3 rounded-lg border border-red-100 shadow-xl text-sm font-medium flex items-center gap-2 max-w-[90%]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{permissionError}</span>
                <button onClick={() => setPermissionError(null)} className="ml-2 text-slate-400 hover:text-slate-600 p-1">×</button>
            </div>
        )}
      </div>

      {/* CHART/DETAILS SECTION (Bottom Half) */}
      <div className="h-1/2 bg-white flex flex-col md:flex-row">
        
        {/* LEFT CHART (Event List) */}
        <div className="w-full md:w-1/3 border-r border-slate-100 overflow-y-auto">
          <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-10 flex justify-between items-center shadow-sm">
            <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <ListFilter className="w-4 h-4 text-blue-600" />
                    Event List
                </h3>
                {userLocation && <p className="text-xs text-blue-600 mt-1">Sorted by distance to you</p>}
            </div>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {sortedEvents.length}
            </span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {sortedEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => handleEventClick(event)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors flex flex-col gap-1 border-l-4 ${selectedEvent?.id === event.id ? 'bg-blue-50 border-blue-500' : 'border-transparent'}`}
              >
                <span className="font-semibold text-slate-900 text-sm">{event.title}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL (Details) */}
        <div className="w-full md:w-2/3 p-6 overflow-y-auto bg-white relative">
          {selectedEvent ? (
            <div className="animate-in fade-in duration-300 pb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                 <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                        {selectedEvent.organization}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedEvent.title}</h2>
                 </div>
                 <a 
                    href={selectedEvent.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm flex-shrink-0"
                 >
                    Official Site
                    <ExternalLink className="w-4 h-4" />
                 </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date & Time
                    </h4>
                    <p className="text-slate-900 font-medium">{selectedEvent.date}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                    </h4>
                    <p className="text-slate-900 font-medium">{selectedEvent.location}</p>
                    <p className="text-slate-500 text-xs mt-1">{selectedEvent.address}</p>
                </div>
              </div>

              <div className="prose prose-slate prose-sm max-w-none">
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Event Overview</h3>
                 <p className="text-slate-600 leading-relaxed">
                    {selectedEvent.description}
                 </p>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                 <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                 <p className="text-sm text-amber-800">
                    Industry meetings are excellent venues for discussing <strong>ASTM F24</strong> updates and <strong>ISO</strong> harmonization efforts.
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <Globe className="w-16 h-16 mb-4 text-slate-200" />
                <h3 className="text-lg font-medium text-slate-600">Select an Event</h3>
                <p className="max-w-xs mx-auto mt-2 text-sm">
                    Choose an event from the list to view full details on the map.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;