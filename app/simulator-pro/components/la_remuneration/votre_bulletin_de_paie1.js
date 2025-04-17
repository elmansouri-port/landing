import React, { useState, useEffect } from "react";
import { format, parse, isValid, isAfter } from "date-fns";

export default function VotreBulletinDePaie1({
  data,
  setData,
  onNext,
  onPrev,
}) {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(
    data.startDate ? parse(data.startDate, "dd/MM/yyyy", currentDate) : null
  );

  const [inputDate, setInputDate] = useState(
    selectedDate
      ? format(selectedDate, "dd/MM/yyyy")
      : format(currentDate, "dd/MM/yyyy")
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    data.startTime || format(currentDate, "HH:mm")
  );
  const [selectedNumberOfDays, setSelectedNumberOfDays] = useState(
    data.numberOfDays || ""
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const [inputErrors, setInputErrors] = useState({
    date: "",
    time: "",
    numberOfDays: "",
  });

  const [isCurrentStepComplete, setIsCurrentStepComplete] = useState(false);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const types = ["jour(s)", "heure(s)"];
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  const validateDate = (dateString) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) {
      return "Format invalide. Utilisez JJ/MM/AAAA";
    }
  
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  
    if (!isValid(parsedDate)) {
      return "Date invalide";
    }
  
    const currentYear = new Date().getFullYear();
    const year = parsedDate.getFullYear();
    if (year < 2010) {
      return "Année invalide";
    }
  
    return "";
  };

  const validateTime = (timeString) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(timeString)) {
      return "Format invalide. Utilisez HH:MM";
    }
    return "";
  };

  const validateNumberOfDays = (numberOfDays) => {
    if (!numberOfDays || isNaN(numberOfDays) || numberOfDays <= 0) {
      return "Nombre de jours invalide";
    }
    return "";
  };

  const clearData = (field) => {
    switch (field) {
      case "date":
        setSelectedDate(null);
        setInputDate("");
        setData((prev) => ({ ...prev, startDate: "" }));
        break;
      case "time":
        setSelectedTime("");
        setData((prev) => ({ ...prev, startTime: "" }));
        break;
      case "numberOfDays":
        setSelectedNumberOfDays("");
        setData((prev) => ({ ...prev, numberOfDays: "" }));
        break;
      case "type":
        setData((prev) => ({ ...prev, type: "" }));
        break;
    }
  };

  const handleTypeSelect = (type) => {
    setData((prev) => ({ ...prev, type }));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate &&
        format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(date)}
          className={`h-8 flex items-center justify-center cursor-pointer rounded-full
            ${isSelected ? "bg-red-500 text-white" : "hover:bg-red-100"}`}
        >
          {day}
        </div>
      );
    }

    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-8"></div>);
    }

    return days;
  };

  const handleDateSelect = (date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    setSelectedDate(date);
    setInputDate(formattedDate);
    setIsCalendarOpen(false);
  };

  const handleInputDateChange = (e) => {
    const value = e.target.value;
    setInputDate(value);

    const parsedDate = parse(value, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate);
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setSelectedTime(newTime);
  };

  const handleNumberOfDaysChange = (e) => {
    const numberOfDays = e.target.value;
    setSelectedNumberOfDays(numberOfDays);
  };

  useEffect(() => {
    const dateError = validateDate(inputDate);
    const timeError = validateTime(selectedTime);
    const numberOfDaysError = validateNumberOfDays(selectedNumberOfDays);

    setInputErrors({
      date: dateError,
      time: timeError,
      numberOfDays: numberOfDaysError,
    });

    const isComplete =
      inputDate &&
      selectedTime &&
      selectedNumberOfDays &&
      data.type &&
      !dateError &&
      !timeError &&
      !numberOfDaysError;

    setIsCurrentStepComplete(isComplete);

    if (isComplete) {
      setData((prev) => ({
        ...prev,
        startDate: inputDate,
        startTime: selectedTime,
        numberOfDays: selectedNumberOfDays,
      }));
    }
  }, [inputDate, selectedTime, selectedNumberOfDays, data.type]);

  return (
    <div className="md:mt-10 pl-4 max-w-2xl bg-[#FCFCFC]">
      <div className="flex flex-col bg-[#FCFCFC]">
        <div className="w-full max-w-[700px] text-left">
          <div className="mb-4 w-[120px] h-[90px] sm:w-[160px] sm:h-[90px]">
            <img
              src="/simulator-pro/the-guy.svg"
              alt="Estimation"
              width="121px"
              height="130px"
            />
          </div>
          <div className="flex flex-wrap items-baseline gap-2 pb-5">
            <div className="text-teal-950 text-4xl font-semibold">
              La rémunération
            </div>
            <div className="text-[#99C2E1] text-2xl">
              / Votre bulletin de paie
            </div>
          </div>
        </div>
      </div>

      <div className="text-base" style={{ color: "#0A2C2D" }}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span>Mon salarié a débuté le</span>

          <div className="relative">
            <div
              className={`${
                inputErrors.date ? "outline-[#E42724]" : "outline-[#285E86]"
              } 
        p-3 rounded-lg outline-2 outline-offset-[-1px] inline-flex 
        justify-start items-center gap-2 w-auto`}
            >
              <div className="flex justify-start items-center">
                <input
                  type="text"
                  value={inputDate}
                  onChange={handleInputDateChange}
                  className={`w-[100px] text-[#285E86] text-base font-medium leading-tight border-none bg-transparent cursor-text focus:outline-none placeholder:text-blue-300`}
                  placeholder="JJ/MM/AAAA"
                />
              </div>
              <div
                className="w-3.5 h-4 relative overflow-hidden cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_135_2133)">
                    <path
                      d="M4 0C4.55312 0 5 0.446875 5 1V2H9V1C9 0.446875 9.44687 0 10 0C10.5531 0 11 0.446875 11 1V2H12.5C13.3281 2 14 2.67188 14 3.5V5H0V3.5C0 2.67188 0.671875 2 1.5 2H3V1C3 0.446875 3.44688 0 4 0ZM0 6H14V14.5C14 15.3281 13.3281 16 12.5 16H1.5C0.671875 16 0 15.3281 0 14.5V6ZM2 8.5V9.5C2 9.775 2.225 10 2.5 10H3.5C3.775 10 4 9.775 4 9.5V8.5C4 8.225 3.775 8 3.5 8H2.5C2.225 8 2 8.225 2 8.5ZM6 8.5V9.5C6 9.775 6.225 10 6.5 10H7.5C7.775 10 8 9.775 8 9.5V8.5C8 8.225 7.775 8 7.5 8H6.5C6.225 8 6 8.225 6 8.5ZM10.5 8C10.225 8 10 8.225 10 8.5V9.5C10 9.775 10.225 10 10.5 10H11.5C11.775 10 12 9.775 12 9.5V8.5C12 8.225 11.775 8 11.5 8H10.5ZM2 12.5V13.5C2 13.775 2.225 14 2.5 14H3.5C3.775 14 4 13.775 4 13.5V12.5C4 12.225 3.775 12 3.5 12H2.5C2.225 12 2 12.225 2 12.5ZM6.5 12C6.225 12 6 12.225 6 12.5V13.5C6 13.775 6.225 14 6.5 14H7.5C7.775 14 8 13.775 8 13.5V12.5C8 12.225 7.775 12 7.5 12H6.5ZM10 12.5V13.5C10 13.775 10.225 14 10.5 14H11.5C11.775 14 12 13.775 12 13.5V12.5C12 12.225 11.775 12 11.5 12H10.5C10.225 12 10 12.225 10 12.5Z"
                      fill="#99C2E1"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_135_2133">
                      <rect width="14" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {isCalendarOpen && (
              <div
                className="absolute z-10 w-85 right-0 bg-white rounded-lg shadow-lg overflow-hidden mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center items-center bg-[#E42724] text-white p-2">
                  <div className="w-9 h-9 p-2 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                            1
                          )
                        );
                      }}
                      className="text-white hover:bg-red-600 rounded-full p-1"
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 12L6.5 8L10.5 4"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mx-4">
                    {months[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </div>
                  <div className="w-9 h-9 p-2 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                            1
                          )
                        );
                      }}
                      className="text-white hover:bg-red-600 rounded-full p-1"
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5 4L10.5 8L6.5 12"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center p-5">
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={`day-${index}`}
                      className="font-bold text-sm py-1 text-[#0A2C2D99]"
                    >
                      {day}
                    </div>
                  ))}
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            value={selectedTime}
            onChange={handleTimeChange}
            className={`w-[80px] ${
              inputErrors.time ? "outline-[#E42724]" : "outline-[#285E86]"
            } font-medium leading-tight bg-transparent text-[#285E86] pr-6 p-3 rounded-lg outline-2 outline-offset-[-1px]`}
            placeholder="Heure"
          />

          <div className="mb-4 text-base" style={{ color: "#0A2C2D" }}>
            <div>
              et son contrat dure{" "}
              <div className="p-3 rounded-lg outline-2 outline-offset-[-1px] outline-cyan-700 inline-flex items-center gap-px relative w-auto max-w-[120px]">
                <input
                  type="Number"
                  value={selectedNumberOfDays}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedNumberOfDays(value);
                  }}
                  className="text-[#285E86] font-medium leading-tight bg-transparent outline-none placeholder:text-blue-300 w-[50px] pr-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="01"
                  style={{ appearance: "none", MozAppearance : "none" }}
                />
                {selectedNumberOfDays && (
                  <button
                    onClick={() => {
                      clearData("numberOfDays");
                      setSelectedNumberOfDays("");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>{" "}
              <span
                className={`px-2 py-0.5 rounded-md ${
                  data.type
                    ? "bg-[#E7F1F8] text-[#285E86]"
                    : "bg-slate-100 text-[#99C2E1]"
                }`}
              >
                <span className="font-medium">{data.type || "jour(s)"}</span>
              </span>
              .
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[500px] inline-flex gap-2.5">
        {types.map((type) =>
          data.type === type ? (
            <div
              key={type}
              onClick={() => handleTypeSelect(type)}
              className="p-3 bg-[#E7F1F8] rounded-md outline-3 outline-[#9DC4E2] cursor-pointer"
            >
              <div className="text-[#285E86] text-sm font-semibold">{type}</div>
            </div>
          ) : (
            <div
              key={type}
              onClick={() => handleTypeSelect(type)}
              className="p-3 rounded-md outline-2 outline-slate-300 cursor-pointer hover:bg-slate-50"
            >
              <div className="text-teal-950 text-sm font-semibold">{type}</div>
            </div>
          )
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-8 py-3 rounded-md bg-[#D5F5F6] text-gray-700 hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Précédent
        </button>

        <button
          onClick={onNext}
          disabled={!isCurrentStepComplete}
          className={`flex items-center gap-2 px-8 py-3 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg 
            ${
              isCurrentStepComplete
                ? "bg-[#E42724] text-white hover:bg-red-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
        >
          Suivant 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
        </button>
      </div>
    </div>
  );
}
