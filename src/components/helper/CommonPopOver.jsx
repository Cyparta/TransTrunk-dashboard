"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { BASE_URL, cn, handleDelayWheel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import InputDemo from "./Input-demo";
import { getCookie } from "cookies-next";
export function ComboboxDemo({
  placeHolder,
  end_point,
  setSelected,
  label,
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

  function handleChoice(e, choice) {
    e.stopPropagation();
    console.log("handleChoice triggered", choice);
    setValue(choice.name || choice.location || choice?.animal_type?.name || choice?.username || choice?.title || choice.code);
    setOpen(false);
    setSearch("");
    setSelected(choice);
  }

  function fetchMoreData() {
    if (data?.next && search.length === 0 && !loading) {
      setPage(page + 1);
      setPaginateLoading(true);
    }
  }

  const handleScroll = (e) => {
    e.stopPropagation();
    const section = containerRef.current;
    const scrollPosition = section.scrollTop + section.clientHeight;
    if (Math.ceil(scrollPosition) >= section.scrollHeight) {
      fetchMoreData();
    }
  };

  React.useEffect(() => {
    console.log("useEffect triggered", { search, page });
    if (search) {
      let timeOut = setTimeout(() => {
        setLoading(true);
        fetch(BASE_URL + `${end_point}?search=${search}&limit=10&offset=0`, {
          method: "GET",
          headers: {
            "Content-Type": "/json",
            Authorization: `JWT ${getCookie("token")}`,
          },
        })
          .then((res) => res.json())
          .then((resultData) => {
            console.log("Data fetched", resultData);
            setData(resultData);
            setResults([...resultData?.results]);
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
          console.log("Data fetched", resultData);
          setData(resultData);
          setResults([...results, ...resultData?.results]);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setPaginateLoading(false);
          setLoading(false);
          setIsStartFetch(false);
        });
    }
  }, [search, page]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          {label && (
            <label className="text-sm text-primary">{label}</label>
          )}
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
      <PopoverContent className="p-0 z-[10000]">
        <div className="relative" onClick={() => console.log("PopoverContent clicked")}>
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
              {results?.map((item) => (
                status === true
                  ? (item.status === "available" && (
                    <div
                      key={item.id}
                      onClick={(e) => handleChoice(e, item)}
                      className={cn(
                        "combobox-item",
                        value === item.value && "selected"
                      )}
                    >
                      {item.name}
                    </div>
                  ))
                  : (
                    <div
                      key={item.id}
                      onClick={(e) => handleChoice(e, item)}
                      className={cn(
                        "combobox-item",
                        value === item.value && "selected"
                      )}
                    >
                      {item.code || item.name || item.location || item?.animal_type?.name || item?.username || item?.title}
                    </div>
                  )
              ))}

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