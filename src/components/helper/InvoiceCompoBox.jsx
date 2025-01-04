"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";

import { BASE_URL, cn, handleDelayWheel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputDemo from "./Input-demo";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

export function InvoiceCombobox({
  placeHolder,
  end_point,
  setSelected,
  error = null,
  status = false,
}) {
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState({});
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isStartFetch, setIsStartFetch] = React.useState(false);
  const [paginateLoading, setPaginateLoading] = React.useState(false);

//   function handleChoice(choice) {
//     setValue(choice.name || choice.location || choice?.animal_type?.name || choice?.username || choice?.title);
//     setOpen(false);
//     setSearch("");
//     setSelected(choice);
//   }

  function fetchMoreData() {
    if (data?.next && search.length === 0 && !loading) {
      setPage(page + 1);
      setPaginateLoading(true);
    }
  }

  const handleScroll = () => {
    const section = containerRef.current;

    // Calculate the scroll position
    const scrollPosition = section.scrollTop + section.clientHeight;
    // Check if the user has reached the bottom
    if (Math.ceil(scrollPosition) >= section.scrollHeight) {
      fetchMoreData();
    }
  };

  React.useEffect(() => {
    if (search) {
      let timeOut = setTimeout(() => {
        setLoading(true);
        // Your search logic here
        fetch(BASE_URL + `${end_point}?search=${search}&limit=10&offset=0`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${getCookie("token")}`,
          },
        })
          .then((res) => res.json())
          .then((resultData) => {
            setData(resultData);
            console.log(resultData, "resultData");
            // {resultData?.results? setResults([...resultData?.results]):setResults([...resultData])}
            setResults([...resultData?.results]);
            console.log(resultData, "resultData");  
          })
          .catch((err) => console.error(err))
          .finally(() => {
            setPaginateLoading(false);
            setLoading(false);
            setIsStartFetch(false);
          });
      }, 1000);
      return () => clearTimeout(timeOut);
    } else {
      setLoading(true);
      // Your search logic here
      fetch(
        BASE_URL +
        `${end_point}?search=${search}&limit=10&offset=${(page - 1) * 10}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${getCookie("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((resultData) => {
            console.log(resultData, "resultData");
          setData(resultData);
          setResults(resultData?.results);
          console.log([ ...resultData?.results])
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setPaginateLoading(false);
          setLoading(false);
          setIsStartFetch(false);
        });
    }
  }, [search, page]);
  const [selectedAnimals, setSelectedAnimals] = React.useState([]);

  const handleChoice = (item) => {
    const selectedItem = item?.code
      ? { animal: item.code }
      : { slaughtered: item.id };
  
    setSelectedAnimals((prevAnimals) => {
      const isExisting = prevAnimals.some(
        (a) =>
          (a.animal && a.animal === selectedItem.animal) ||
          (a.slaughtered && a.slaughtered === selectedItem.slaughtered)
      );
  
      if (isExisting) {
        // Deselect animal or slaughtered by removing it from the array
        return prevAnimals.filter(
          (a) =>
            !(a.animal && a.animal === selectedItem.animal) &&
            !(a.slaughtered && a.slaughtered === selectedItem.slaughtered)
        );
      } else {
        // Add new animal or slaughtered with an initial quantity of 1
        return [...prevAnimals, { ...selectedItem, quantity: 1 }];
      }
    });
  };
  
  const handleQuantityChange = (item, increment) => {
    setSelectedAnimals((prevAnimals) =>
      prevAnimals.map((a) => {
        const isMatchingItem =
          (item.code && a.animal === item.code) ||
          (item.animal && a.slaughtered === item.id);
  
        if (isMatchingItem) {
          if (item.animal && increment > 0 && a.quantity >= item.weight) {
            toast.error(`Cannot increase beyond max weight of ${item.weight}`);
            return a;
          }
          return { ...a, quantity: Math.max(0, a.quantity + increment) };
        }
        return a;
      })
    );
  };
  console.log(selectedAnimals)
  React.useEffect(() => {
    console.log(selectedAnimals, "selectedAnimals");
    setSearch("");
    setSelected(selectedAnimals);
    setValue(selectedAnimals.map((a) => (a.animal||a.slaughtered)).join(", "));
  }, [selectedAnimals]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full flex justify-between text-gray-300 font-light border border-secondary-foreground"
            onClick={() => setIsStartFetch(true)}
            type="button"
          >
            <p className="max-w-[280px] truncate line-clamp-1">
              {value ? value : placeHolder || "Select an item . . ."}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="relative z-10">
          {error ? (
            <p className="text-red-800 text-xs pt-1 m-0">{error}</p>
          ) : null}
          <InputDemo
            id="framework"
            type="text"
            placeHolder="What Are You Looking For ......"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            inputStyle="bg-inherit border"
          />
          {loading && !paginateLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <LoaderCircle size={23} className="animate-spin text-primary" />
            </div>
          ) : results?.length === 0 ? (
            <div className="flex items-center justify-center gap-2 text-gray-400 min-h-[200px]">
              No Results found. Try a different search ...
            </div>
          ) : (
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="flex flex-col gap-2 p-2 max-h-[200px] overflow-y-scroll"
              key="container"
              onWheel={handleDelayWheel}
            >
               {results?.map((item) => {
  console.log(item);
  const isSelected = selectedAnimals.some(
    (a) =>
      (a.animal && a.animal === item.code) ||
      (a.slaughtered && a.slaughtered === item?.id)
  );
  const quantity = selectedAnimals.find(
    (a) =>
      (a.animal && a.animal === item.code) ||
      (a.slaughtered && a.slaughtered === item?.id)
  )?.quantity || 0;

  return (
    <div
      key={item.code || item.id} // Ensure unique key
      className={cn(
        "flex items-center justify-between hover:bg-gray-100 cursor-pointer p-2",
        isSelected && "bg-gray-100"
      )}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleChoice(item)}
      />

      {/* Item name */}
      <span className="flex-1 ml-2">
        {item?.name || `${item?.animal_details?.animal_type?.name} : ${item?.weight}kg`}
      </span>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 self-center">
        <button
          onClick={() => handleQuantityChange(item, -1)}
          disabled={!isSelected || quantity <= 0}
          className="bg-primary rounded-full text-white flex justify-center items-center w-4 h-4"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => handleQuantityChange(item, 1)}
          disabled={!isSelected}
          className="bg-primary rounded-full text-white flex justify-center items-center w-4 h-4"
        >
          +
        </button>
      </div>
    </div>
  );
})}

              {paginateLoading && loading && (
                <div className="flex items-center justify-center">
                  <LoaderCircle
                    size={23}
                    className="animate-spin text-primary"
                  />
                </div>
              )}
            </div>

          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
