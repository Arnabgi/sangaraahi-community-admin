import { Apollo, gql } from 'apollo-angular';
import { ModuleKeyType } from '../interfaces/module-key-type.interface';

export const query_modules:ModuleKeyType = {
    //Login
    registerByPhone: gql`mutation($data: InputUser){
        registerByPhone(data: $data) {
          code
          message
          error
          systemCode
          data {
            login
            phone
            token {
              accessToken
              refreshToken
            }
          }
        }
      }`,
    //Get Country List
    getCountryCodes: gql`query GetCountryCodes {
        getCountryCodes {
            error
            systemCode
            code
            message
            data {
              name
              dialCode
              code
            }
        }
    }`,
    //Send Otp
    verifyOtp: gql`mutation($data: OtpInput){
        verifyOtp(data:$data) {
            code
            error
            message
            systemCode
            data {
                token {
                    accessToken
                    refreshToken
                }
                status
                causeOfAction
                user{
                    name
                    email
                    phone
                }
                role
                roleKey
                communityName
                communityId
            }
        }
    }`,
    resendOtp: gql`mutation($data:ResendOtp) {
        resendOtp(data:$data) {
            code
            error
            message
            systemCode
        }
    }`,
    //Logout
    logout: gql`mutation Logout {
        logout {
            code
            error
            systemCode
            message
        }
    }`,
}