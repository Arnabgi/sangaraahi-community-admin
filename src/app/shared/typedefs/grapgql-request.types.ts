import { GeneralResponse } from "../interfaces/general-response.ineterface";
// All types will return general response

export type GraphQLRequests = {
    getCountryCodes: GeneralResponse,
    registerByPhone: GeneralResponse,
    verifyOtp: GeneralResponse,
    resendOtp: GeneralResponse,
    logout: GeneralResponse,
}