import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  addToBrainBucket,
  updateToBrainBucket,
} from "../redux/brainBucketSlice";
import { Copy, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchPrams, setSearchParams] = useSearchParams();
  const bucketId = searchPrams.get("bucketId");

  const dispatch = useDispatch();

  const allBuckets = useSelector((state) => state.brainBuckets.brainBucket);

  const createBucket = () => {
    const bucket = {
      title: title,
      content: value,
      _id:
        bucketId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (bucketId) {
      /* update */
      dispatch(updateToBrainBucket(bucket));
    } else {
      /* create */
      dispatch(addToBrainBucket(bucket));
    }
    /* after creation or updated */
    setTitle("");
    setValue("");
    /* Remove bucketId from URL after creating/updating bucket */
    setSearchParams({});
  };

  const resetBucket = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (bucketId) {
      const bucket = allBuckets.find((b) => b._id === bucketId);
      setTitle(bucket.title);
      setValue(bucket.content);
    }
  }, [allBuckets, bucketId]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              const words = e.target.value.trim().split(" ");
              if (words.length <= 15) {
                setTitle(e.target.value);
              } else {
                toast.error("Title words limit exceeds", {
                  position: "top-right",
                });
              }
            }}
            className={`${
              bucketId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  md:text-xs lg:text-sm px-5 h-10 sm:h-8 md:h-9 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap"
            onClick={createBucket}
          >
            {bucketId ? "Update Bucket" : "Create Bucket"}
          </button>

          {bucketId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetBucket}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start  relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgba(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgba(254,188,46)]`}
              />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgba(45,200,66)]`}
              />
            </div>

            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group `}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-success-500 size-{20" />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Content Here...."
            className="w-full p-3  focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
