import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="hidden md:flex flex-wrap dark:bg-gray-600 bg-amber-100 p-4 justify-center gap-3 sm:gap-4 px-4 mx-auto">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        <NavbarItem title="Trending Movies" param="trending_movies" />
        <NavbarItem title="Trending Shows" param="trending_shows" />
        <NavbarItem title="Top Rated Movies" param="rated_movies" />
        <NavbarItem title="Top Rated Shows" param="rated_shows" />
      </div>
    </div>
  );
}
