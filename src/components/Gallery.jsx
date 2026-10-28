
import { useState , useCallback, useMemo, useReducer, useEffect} from 'react';
import { favouritesReducer } from '../reducers/favouritesReducer.jsx';
import useFetchPhotos from '../hooks/useFetchPhotos.js';
import PhotoCard from "./PhotoCard";


const getInitialFavourites = () => {
            const savedFavourites = localStorage.getItem("favourites");

            return savedFavourites
                ? JSON.parse(savedFavourites)
                : [];
};

const Gallery = () =>{

    

    const { photos, loading, error} = useFetchPhotos();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = useCallback((e)=>{
        setSearchTerm(e.target.value);
    }, []);
    const[favourites, dispatch] = useReducer(
        favouritesReducer, [], getInitialFavourites
    );
    useEffect(()=>{
        localStorage.setItem(
            "favourites",
            JSON.stringify(favourites)
        );
    }, [favourites]);

    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [photos, searchTerm]);

    const toggleFavourite = (photoId)=>{
        console.log("clicled:", photoId);
        dispatch({
            type: "TOGGLE_FAVOURITE",
            payload: photoId,
        });
    };

    

    if(loading){
        {/*early returns */ }
        if (loading) {
            return (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        <p className="mt-2">Loading photos...</p>
                    </div>
            );
        }

    }

    if(error){
        return <div>Unable to load photos: {error}</div>;
    }


   

        return (
                   
                                        
        <section className="min-h-screen bg-[#1D1326] py-12 md:py-16">
              <div className="mb-10 flex justify-end md:mb-12 lg:mb-14  mr-6">
                <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by author..."
                        aria-label="Search photos by author"
                        className="jim-nightshade-regular w-full rounded-lg bg-[#D5C3D1] px-4 py-2 text-xl text-[#1D1326] placeholder:text-[#1D1326]/50 focus:outline-none focus:ring-2 focus:ring-[#B784A7] md:w-80"
                    />
              </div>

            <div className="max-w-7xl mx-auto px-5 md:px-8">

            {/* Heading */}
            <div className="relative text-center mb-12">

                {/* Soft glow behind the heading (keep it faint so the photos stay the colour) */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[#B784A7]/10 blur-3xl" />

                <h1 className="jim-nightshade-regular relative text-[#B784A7] text-5xl md:text-6xl lg:text-8xl">
                Photo Card Gallery
                </h1>

                {/* Subtext with a fading line on each side */}
                <div className="relative mt-3 flex items-center gap-4 md:gap-6">
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-[#B784A7]/60 sm:block" />
                    <p className="jim-nightshade-regular text-[#B784A7]/70 text-2xl md:text-3xl lg:text-4xl">
                    A collection of moments captured by photographers.
                    </p>
                    <div className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-[#B784A7]/60 sm:block" />
                </div>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo, index) => (
                <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    isFavourite={favourites.includes(photo.id)}
                    onToggleFavourite={toggleFavourite}
                />
                ))}
            </div>

            </div>
        </section>
        );

};

export default Gallery;