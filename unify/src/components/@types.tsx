export interface Extracurricular {
    _id?: string,
    name: string,
    description: string,
    dateStarted: string,
    dateEnded?: string,
    onGoing: boolean,
    references?: reference[]
}

export interface Application {
    _id?: string
    uniName: string,
    programName: string,
    applicationOpenDate: string,
    applicationCloseDate: string,
    ExpectedResponseDate?: string,
    relevantExtracurriculars: Extracurricular[],
    notes: string,
}

export interface ApplicationSubmission {
    uniName: string,
    programName: string,
    applicationOpenDate: number,
    applicationCloseDate: number,
    expectedResponseDate?: number,
    relevantExtracurriculars: Extracurricular[],
    notes: string
}


export interface ExtracurricularSubmission {
    name: string,
    description: string,
    dateStarted: number,
    dateEnded?: number,
    onGoing: boolean,
    references?: reference[]
}

export interface reference {
    name: string,
    phoneNumber?: string;
    email?: string
}
