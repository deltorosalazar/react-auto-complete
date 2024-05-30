import React, { ChangeEvent, useState } from "react";

function Autocomplete() {
    const [inputValue, setInputValue] = useState<string | null>("");
    const [options, setOptions] = useState<Array<string> | []>([]);
    const textOptions: Array<string> = ["Colombia", "Estados Unidos", "Francia"];

    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log("Error:", err));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filteredOptions: Array<string> = textOptions.filter((option: string) =>
                option.toLowerCase().includes(value.toLowerCase())
            );

            let highlightedFilteredOptions: any = filteredOptions.map((filteredOption) => {
                const regex = new RegExp(value, "gi");
                const newText = filteredOption.replace(regex, '<mark class="highlight">$&</mark>');
                return <span dangerouslySetInnerHTML={{ __html: newText }} />;
            });

            setOptions(highlightedFilteredOptions);
        } else {
            setOptions([]);
        }
    }

    function hadleOptionClick(value: string)  {
       setInputValue(value as string);
       setOptions([]);
    }

    return (
        <div className="input-container">
            <input
                type="text"
                value={inputValue as string}
                onChange={handleInputChange}
                aria-autocomplete="list"
                aria-controls="autocomplete-list"
                placeholder="Type your country search"
            />
            {options.length > 0 && (
                <ul className="options-list">
                    {options.map((option: string, index: number) => (
                        <li
                            key={index}
                            onClick={() => hadleOptionClick(option)}
                            role="option"
                            aria-selected
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

function initialize(countriesData: Array<string>): Array<string> {
    countriesData.forEach((country) => console.log());
    return countriesData;
}

export default Autocomplete;
