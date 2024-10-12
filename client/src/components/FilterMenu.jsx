import { useEffect, useState } from 'react';
import check from '../assets/check.svg';
import checklight from '../assets/checklight.svg';

import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useContext';

function FilterMenu() {

    const { setFilter, setSearch } = useAuth();
    const navigate = useNavigate();
    const [md, setMd] = useState(false);

    const filters = {
        "category": [
            "Tools",
            "Clothing",
            "Toys",
            "Furniture",
            "Electronics"
        ],
        "price-range": {
            "min": 7,
            "max": 500
        },
        "status": [
            "in stock",
        ],
        "type": [
            "Hand Tool"
        ],
        "material": [
            "Plastic",
            "Leather"
        ],
        "warranty_years": [
            1
        ],
        "battery_required": [
            "true",
            "false"
        ]
    };

    const [finalData, setFinalData] = useState({
        category: [],
        priceRange: [filters["price-range"].min, filters["price-range"].max],
        status: [],
        type: [],
        material: [],
        warranty_years: [],
        battery_required: []
    });

    const [priceRange, setPriceRange] = useState([filters["price-range"].min, filters["price-range"].max]);

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPriceRange((prev) => {
            const newRange = [...prev];
            if (name === 'min') {
                newRange[0] = Math.min(value, newRange[1]);
            } else {
                newRange[1] = Math.max(value, newRange[0]);
            }

            setFinalData((prevData) => ({
                ...prevData,
                priceRange: newRange
            }));

            return newRange;
        });
    };

    const [open, setOpen] = useState(null);

    const toggleAccordion = (filter) => {
        setOpen((prev) => (prev === filter ? null : filter));
    };

    const handleOptionChange = (filterKey, option) => {
        setFinalData((prevData) => {
            const updatedFilter = prevData[filterKey].includes(option)
                ? prevData[filterKey].filter(item => item !== option)
                : [...prevData[filterKey], option];

            return {
                ...prevData,
                [filterKey]: updatedFilter
            };
        });
    };

    useEffect(() => {
        const checkDeviceWidth = () => {
            if (window.innerWidth < 768) {
                setMd(true);
            } else {
                setMd(false);
            }
        };
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);
        return () => window.removeEventListener('resize', checkDeviceWidth);
    }, []);

    useEffect(()=>{
        if(md){
            navigate('/');
        }
    },[md])

    async function handleApplyFilters() {
        if(md){
            setSearch('xyzhehe');
            setFilter(finalData);
        } else {
            setFilter(null);
            setSearch(null);
            const strFilter = JSON.stringify(finalData);
            navigate('/filter/' + strFilter, { state: { filter: finalData } });
        }
    }

    return (
        <div onClick={(e) => {
            e.stopPropagation();
        }} className="absolute z-50 bottom-0 right-0 bg-gray-100 dark:bg-[#4B5563] dark:text-white translate-y-[100%] w-[250px] rounded-sm shadow-lg">
            {Object.entries(filters).map(([filter, options]) => (
                <div key={filter}>
                    <div
                        className="h-[40px] p-2 rounded-sm flex justify-start items-center hover:bg-gray-300 hover:dark:bg-gray-500 cursor-pointer"
                        onClick={() => toggleAccordion(filter)}
                    >
                        <span>{filter.replace(/_/g, ' ')}</span>
                        <span className="ml-auto">{open === filter ? '−' : '+'}</span>
                    </div>
                    <div
                        style={{
                            maxHeight: open === filter ? '200px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease'
                        }}
                    >
                        <div>
                            {typeof options === 'object' && !Array.isArray(options) ? (
                                <div className='p-2'>
                                    <div className="flex justify-between mb-2">
                                        <span>Min: {priceRange[0]}</span>
                                        <span>Max: {priceRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        name="min"
                                        min={options.min}
                                        max={options.max}
                                        value={priceRange[0]}
                                        onChange={handlePriceChange}
                                        className="w-full"
                                    />
                                    <input
                                        type="range"
                                        name="max"
                                        min={options.min}
                                        max={options.max}
                                        value={priceRange[1]}
                                        onChange={handlePriceChange}
                                        className="w-full"
                                    />
                                </div>
                            ) : (
                                options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`h-[40px] flex justify-between items-center p-2 pl-4 w-full text-base bg-gray-200 dark:bg-gray-500 text-gray-800 dark:text-white rounded-sm cursor-pointer 
                                        ${finalData[filter]?.includes(option) ? 'bg-blue-200' : 'hover:bg-gray-300 hover:dark:bg-gray-400'}`}
                                        onClick={() => handleOptionChange(filter, option)}
                                    >
                                        <span
                                            className={`${
                                                finalData[filter]?.includes(option) ? 'text-gray-400' : ''
                                            }`}
                                        >
                                            {option}
                                        </span>
                                        {finalData[filter]?.includes(option) && (
                                            <div>
                                                <img src={check} alt="check icon" className="w-4 h-4 mr-2 dark:flex hidden" />
                                                <img src={checklight} alt="check icon" className="w-4 h-4 mr-2 dark:hidden flex" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <button
                className="h-[40px] p-2 rounded-sm flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white w-full"
                onClick={handleApplyFilters}
            >
                Apply
            </button>
        </div>
    );
}

export default FilterMenu;
