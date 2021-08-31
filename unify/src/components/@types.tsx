export interface Extracurricular {
    _id?: string,
    name: string,
    description: string,
    dateStarted: string,
    dateEnded?: string,
    onGoing: boolean
}

export interface Application {
    _id?: string
    uniName: string,
    programName: string,
    applicationOpenDate: string,
    applicationCloseDate: string,
    ExpectedResponseDate?: string,
    relevantExtracurriculars: Extracurricular[],
    notes: string
}

