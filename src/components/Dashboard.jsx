import Upcoming from "./Upcoming";
import StickyWall from "./StickyWall";

export default function Dashboard() {
  return (
    <>
      <div className="text-gray-900 dark:text-white p-4 md:ml-64 mt-[60px]">
        {/* <Upcoming /> */}
        <div><StickyWall /></div>
      </div>
    </>
  );
}
