import { TypedDocumentNode, ResultOf, VariablesOf } from "apollo-angular"
export interface ModuleKeyType {
    'getCountryCodes': TypedDocumentNode<ResultOf<any>, VariablesOf<any>>;
    'registerByPhone': TypedDocumentNode<ResultOf<any>, VariablesOf<any>>;
    'verifyOtp': TypedDocumentNode<ResultOf<any>, VariablesOf<any>>;
    'resendOtp': TypedDocumentNode<ResultOf<any>, VariablesOf<any>>;
    'logout':TypedDocumentNode<ResultOf<any>, VariablesOf<any>>; 
}