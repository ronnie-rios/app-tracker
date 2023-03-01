import { createContext, useContext, useState } from "react";

const JobContext = createContext({
    jobRecs: []
});

function JobProvider({ children }) {
    const [jobData, setJobData] = useState([]);
    
    return (
        <JobContext.Provider value = 
            {{
                jobData: jobData,
                setJobData
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export function useJobs() {
    return useContext(JobContext)
}

export { JobProvider }