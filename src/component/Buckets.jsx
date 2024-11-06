import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBrainBuckets } from "../redux/brainBucketSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";

import { FormDate } from "../utils/formDate.js";

const Buckets = () => {
  const bucket = useSelector((state) => state.brainBuckets.brainBucket);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (bucketId) => {
    dispatch(removeFromBrainBuckets(bucketId));
  };

  const filteredData = bucket.filter((brainBucket) =>
    brainBucket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/*Search  */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            value={searchTerm}
            placeholder="Search bucket here...."
            className="focus:outline-none w-full bg-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Buckets */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Buckets
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredData.length > 0 ? (
              filteredData.map((b) => (
                <div
                  key={b?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading & description */}
                  <div className="w-[60%]  flex flex-col space-y-3 text-left">
                    <p className="text-4xl font-semibold">{b.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {b?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                        <NavLink to={`/?bucketId=${b?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </NavLink>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(b?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                        <NavLink to={`/bucket/${b._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </NavLink>
                      </button>

                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(b?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex">
                      <Calendar className="text-black" size={20} />
                      {FormDate(b?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buckets;
