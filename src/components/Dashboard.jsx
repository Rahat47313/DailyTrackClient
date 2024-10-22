import Upcoming from "./Upcoming";
import StickyWall from "./StickyWall";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 md:ml-64 text-gray-900 dark:text-white mt-[60px]">
        {/* <Upcoming /> */}
        <div className="text-gray-900"><StickyWall /></div>
      </div>
    </>
  );
}
