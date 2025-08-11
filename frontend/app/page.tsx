import Image from "next/image";

export default function Home() {
return (
<div className=" max-w-[90vw] mx-auto grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
{/* Example elements */}
<div className="min-w-[225px] min-h-[250px] bg-gray-200 flex items-center justify-center">
Element 1
</div>
<div className="min-w-[225px] min-h-[250px] bg-gray-200 flex items-center justify-center">
Element 2
</div>
<div className="min-w-[225px] min-h-[250px] bg-gray-200 flex items-center justify-center">
Element 3
</div>
<div className="min-w-[225px] min-h-[250px] bg-gray-200 flex items-center justify-center">
Element 4
</div>
</div>
);
}