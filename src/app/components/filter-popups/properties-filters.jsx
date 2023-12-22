"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Checkbox, CheckboxGroup, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import {
  setAreaCountry,
  setAreaMiningArea,
  setAreaZoomMode,
  setIsAreaSideNavOpen,
} from "../../../store/area-map/area-map-slice";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const PropertiesFilter = ({ isOpenIn, closePopup }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");
  // const [country, setCountry] = useState("Canada");
  const [countryList, setCountryList] = useState([]);
  // const [areaList, setAreaList] = useState([]);
  // // const [miningArea, setMiningArea] = useState("");
  // const [miningArea, setMiningArea] = useState("Timmins");

  // const selectedMap = useSelector(
  //   (state) => state.mapSelectorReducer.selectedMap
  // );
  // const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  // const areaZoomLevel = useSelector(
  //   (state) => state.mapSelectorReducer.areaZoomLevel
  // );
  // const areaInitialCenter = useSelector(
  //   (state) => state.mapSelectorReducer.areaInitialCenter
  // );
  // const isSideNavOpen = useSelector(
  //   (state) => state.mapSelectorReducer.isSideNavOpen
  // );

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  };

  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);

  // useEffect(() => {
  //   setCountry(areaCountry);
  //   setMiningArea(areaName);
  // }, [areaName, areaCountry]);
  //areal load
  // useEffect(() => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/areas/${country}`,
  //       { cache: "force-cache" }
  //     );
  //     const d = await res.json();
  //     console.log("areas", d.data);
  //     setAreaList(d.data);
  //   };

  //   f().catch(console.error);
  // }, [country]);

  const searchAction = async () => {
    closePopup();
  };

  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/countrylist`,
        {
          cache: "force-cache",
        }
      );
      const d = await res.json();
      setCountryList(d.data);
    };

    f().catch(console.error);
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Filters
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
          <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8">
                <div className="w-full px-3 flex flex-col gap-3">
                  <div className="flex gap-2 border-b-2">
                    <Autocomplete
                      size={"sm"}
                      label="Property Name"
                      className="max-w-xs"
                      onInputChange={(e) => {
                        setCountry(e);
                      }}
                      defaultSelectedKey={country}
                    >
                      {countryList.map((countryObj) => (
                        <AutocompleteItem
                          key={countryObj.country}
                          value={countryObj.country}
                        >
                          {countryObj.country}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <Autocomplete
                      size={"sm"}
                      label="Asset Name"
                      className="max-w-xs mb-4"
                      onInputChange={(e) => {
                        setCountry(e);
                      }}
                      defaultSelectedKey={country}
                    >
                      {countryList.map((countryObj) => (
                        <AutocompleteItem
                          key={countryObj.country}
                          value={countryObj.country}
                        >
                          {countryObj.country}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">Filter By Type</span>
                      <CheckboxGroup
                        label="Select cities"
                        defaultValue={["buenos-aires", "london"]}
                      >
                        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                        <Checkbox value="sydney">Sydney</Checkbox>
                        <Checkbox value="san-francisco">San Francisco</Checkbox>
                        <Checkbox value="london">London</Checkbox>
                        <Checkbox value="tokyo">Tokyo</Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300 min-w-[550px]">
                <div className="mt-2">
                  <Chip
                    color="default"
                    variant="light"
                    className="cursor-pointer"
                  >
                    Reset
                  </Chip>
                </div>
                <div className="mt-2">
                  <Chip
                    color="primary"
                    className="cursor-pointer hover:bg-blue-500 custom-button-1"
                    onClick={searchAction}
                  >
                    Search
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default PropertiesFilter;
