import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6">
      <NavbarItem title="Trending Movies" param="trending_movies" />
      <NavbarItem title="Trending Shows" param="trending_shows" />
      <NavbarItem title="Top Rated Movies" param="rated_movies" />
      <NavbarItem title="Top Rated Shows" param="rated_shows" />
    </div>
  );
}
