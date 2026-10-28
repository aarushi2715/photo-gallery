const PhotoCard = ({ photo , index ,isFavourite, onToggleFavourite}) => {
     const desktopOffsets = [
    "-lg:translate-y-4",
    "lg:translate-y-19",
    "lg:translate-y-6",
    "lg:translate-y-16",
  ];

    const desktopOffset = desktopOffsets[index % 4];

  const tabletOffset =
    index % 2 === 0
      ? "md:translate-y-0"
      : "md:translate-y-10";

  

      const position = index % 4;   

  return (
    <div className={`${tabletOffset} ${desktopOffset}`}>
            <article className={`photo-card photo-card-${position} bg-[#D5C3D1] rounded-xl p-3`}   style={{
          animationDelay: `${(index % 4) * 100}ms`,
        }}>
                

            <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                src={photo.download_url}
                alt={`Photo by ${photo.author}`}
                className="w-full h-full object-cover"
                />
            </div>

            <div className=" jim-nightshade-regular flex items-center justify-between pt-3 px-1 ">
                <p className="text-[#1D1326] text-2xl md:text-3xl lg:text-2xl">
                {photo.author}
                </p>

                <button
                type="button"
                className="text-[#1D1326] text-2xl"
                aria-label={`Like photo by ${photo.author}`}
                onClick={() => onToggleFavourite(photo.id)}
                >
                {isFavourite ? "♥" : "♡"}
                </button>
            </div>

            </article>
       </div>     
  );
};

export default PhotoCard;