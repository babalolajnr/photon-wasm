import Toastr from 'toastr'
import RunTimeDisplay from "./RunTimeDisplay";


export default class ToastrRunTimeDisplay implements RunTimeDisplay {

    show(message: string): void {
        Toastr.info(message, undefined, {
            "timeOut": -1
        })
    }
}