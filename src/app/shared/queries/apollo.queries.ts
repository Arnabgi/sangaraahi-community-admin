import { Apollo, gql } from 'apollo-angular';
import { ModuleKeyType } from '../interfaces/module-key-type.interface';

export const query_modules:ModuleKeyType = {
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