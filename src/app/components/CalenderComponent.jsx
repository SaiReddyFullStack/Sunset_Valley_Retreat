
import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
// google copy paste
import 'react-date-range/dist/styles.css';         // main style file
import 'react-date-range/dist/theme/default.css';  // theme css file

const CalenderComponent = ({onDatesSelect}) => {
    const [showCalender,setShowCalender] = useState(false);  // calendar open and close
    const [selectedDates,setSelectedDates] =useState(null);  //  dates select
    // copy paste google
    const [date,setDate] = useState([
        {
        startDate: new Date(),   // today date
        endDate:   new Date(),   // end date
        key: 'selection'
        }
        ]);

        // function
        const handleSelectDate = async()=>{
            const startDate = date[0].startDate.toLocaleDateString();
            const endDate   = date[0].endDate.toLocaleDateString();
        // Dates
            setSelectedDates(`Selected Dates:${startDate} - ${endDate}`);
            setShowCalender(false);    // data select after automatic ga selectDates close it.
            const bookingDates = {startDate,endDate}
            console.log("selected dates calender",bookingDates);

            // bookingsdates pass it
            if(onDatesSelect){
                onDatesSelect(bookingDates) // arguments dates pass it  page.jsx[detail]
            }
        }
           
        // startdate == currentdate
        const currentDate = new Date().toDateString();
        const nextDate    = new Date()
        nextDate.setDate(nextDate.getDate()+1)    // current date ki 1 Day extra add it.
        // get it date
        const formattedDate = nextDate.toDateString()


        return(
            <div className='calenderSection'>
                                        {/*  toggle */}
                <div className="currentDate" onClick={()=>setShowCalender(!showCalender)}>
                    {/* state false ayyanappudu [default current date] show here */}
                    {!selectedDates && (   
                        <>
                    {`${currentDate} - ${formattedDate}`}  
                        </>
                    )}
                    {selectedDates && (              // user date add it update state.
                        <div className="" style={{color:'blue'}}> 
                            {selectedDates} 
                        </div> // selecteddates user date add it color change "green"
                    )}
                </div>

                {showCalender && 
                <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className='dateRange'
                    /> }

            <button onClick={ handleSelectDate} className='calenderButton'>Select Dates</button>

            </div>
        )
    }

export default CalenderComponent;
